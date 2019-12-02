import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from '../../models/author/author';
import { DataAuthorService } from '../../models/author/data-author.service';

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.css']
})
export class AdminAuthorsComponent implements OnInit {

  @ViewChild('editAuthor', {static: false}) editTemplate: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Author>;
  authors: Author[];

  displayedColumns: string[] = ['id', 'name', 'action'];
  registerForm: FormGroup;
  newAuthorForm: FormGroup;
  current: Author;

  constructor(private modalService: NgbModal, private dataService: DataAuthorService) { }

  ngOnInit() {
    this.dataService.getAuthors().subscribe(
      result => {
        this.authors = result.authors;
        this.dataSource = new MatTableDataSource(this.authors);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
    });

    this.newAuthorForm = new FormGroup({
      name: new FormControl(['', Validators.required])
    });
  }

  remove(id: any) {
    this.dataService.deleteAuthor(id)
      .subscribe(() => {
          this.authors.forEach((item, index) => {
            if (item._id === id) {
              this.authors.splice(index, 1);
            }
          });

          this.dataSource.data = this.authors;
        }
      );
  }

  onEditAuthor() {
    const toUpdate = [];

    if (this.current.name !== this.registerForm.get('name').value) {
      this.current.name = this.registerForm.get('name').value;
      toUpdate.push({propName: 'name', value: this.registerForm.get('name').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateAuthor(this.current._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.authors;
          this.modalService.dismissAll();
        }
      );
  }

  openEditAuthor(author: Author) {
    this.current = author;
    this.registerForm.controls['name'].setValue(author.name);
    this.openModal(this.editTemplate, 'modal-edit-author');
  }

  onNewAuthor() {
    const author = new Author();
    author.name = this.newAuthorForm.get('name').value;


    this.dataService.newAuthor(author)
      .subscribe(res => {
          this.authors.push(res['createdAuthor']);
          this.dataSource.data = this.authors;
        }, (err) => {
          console.log(err);
        }
      );

    this.modalService.dismissAll();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
      this.registerForm.reset();
      this.newAuthorForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newAuthorForm.reset();
    });
  }
}
