import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Review} from '../../models/review/review';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {

  @ViewChild('editReview', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<Review>;
  reviews: Review[] = [
    {_id: '1', stars: 1, feelings: [1, 3]},
    {_id: '2', stars: 2, feelings: []},
    {_id: '3', stars: 5, feelings: [1]},
    {_id: '4', stars: 5, feelings: [1, 3, 8, 10]},
  ];

  displayedColumns: string[] = ['id', 'stars', 'feelings', 'action'];
  registerForm: FormGroup;
  current: Review;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.reviews);

    this.registerForm = new FormGroup({
      _id: new FormControl(['', Validators.required]),
      stars: new FormControl(['', Validators.required]),
      feelings: new FormControl(['', Validators.required]),
    });
  }

  remove(id: any) {
    this.reviews = this.reviews.filter(review => String(review._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.reviews);
  }

  onEditReview() {
    this.current.stars = this.registerForm.get('stars').value;
    this.current.feelings = this.registerForm.get('feelings').value;
    this.modalService.dismissAll();
  }

  openEditReview(review: Review) {
    this.current = review;
    this.registerForm.controls['feelings'].setValue(this.current.feelings);
    this.registerForm.controls['stars'].setValue(this.current.stars);
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
