import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Review} from '../../models/review/review';
import {DataShopService} from '../../models/shop/data-shop.service';
import {DataReviewService} from '../../models/review/data-review.service';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {

  @ViewChild('editReview', {static: false}) editTemplate: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Review>;
  reviews: Review[];

  displayedColumns: string[] = ['id', 'stars', 'feeling', 'user', 'action'];
  registerForm: FormGroup;
  current: Review;

  constructor(private modalService: NgbModal, private dataService: DataReviewService) { }

  ngOnInit() {
    this.dataService.getReviews().subscribe(
      result => {
        this.reviews = result.reviews;
        this.dataSource = new MatTableDataSource(this.reviews);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.registerForm = new FormGroup({
      _id: new FormControl(['', Validators.required]),
      stars: new FormControl(['', Validators.required]),
      feeling: new FormControl(['', Validators.required]),
      user: new FormControl(['', Validators.required]),
    });
  }

  remove(id: any) {
    this.dataService.deleteReview(id)
      .subscribe(() => {
          this.reviews.forEach((item, index) => {
            if (item._id === id) {
              this.reviews.splice(index, 1);
            }
          });

          this.dataSource.data = this.reviews;
        }
      );
  }

  onEditReview() {
    const toUpdate = [];

    if (this.current.stars !== this.registerForm.get('stars').value) {
      this.current.stars = this.registerForm.get('stars').value;
      toUpdate.push({propName: 'stars', value: this.registerForm.get('stars').value});
    }

    if (this.current.feeling !== this.registerForm.get('feeling').value) {
      this.current.feeling = this.registerForm.get('feeling').value;
      toUpdate.push({propName: 'feeling', value: this.registerForm.get('feeling').value});
    }

    if (this.current.user !== this.registerForm.get('user').value) {
      this.current.user = this.registerForm.get('user').value;
      toUpdate.push({propName: 'user', value: this.registerForm.get('user').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateReview(this.current._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.reviews;
          this.modalService.dismissAll();
        }
      );

  }

  openEditReview(review: Review) {
    this.current = review;
    this.registerForm.controls['feeling'].setValue(this.current.feeling);
    this.registerForm.controls['stars'].setValue(this.current.stars);
    this.registerForm.controls['user'].setValue(this.current.user);
    this.openModal(this.editTemplate, 'modal-edit-review');
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.then((result) => {
      this.registerForm.reset();
    }, (reason) => {
      this.registerForm.reset();
    });
  }
}
