import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Item} from '../../item/item';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Author} from '../../author/author';

@Component({
  selector: 'app-admin-authors',
  templateUrl: './admin-authors.component.html',
  styleUrls: ['./admin-authors.component.css']
})
export class AdminAuthorsComponent implements OnInit {

  @ViewChild('editAuthor', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<Author>;
  authors: Author[] = [
    {_id : '1', name: 'radu spaimoc'},
    {_id : '2', name: 'conxa mas'},
    {_id : '3', name: 'luis choclo'},
  ];

  displayedColumns: string[] = ['id', 'name', 'action'];
  registerForm: FormGroup;
  newAuthorForm: FormGroup;
  myControl = new FormControl();
  current: Author;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.authors);

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
    });

    this.newAuthorForm = new FormGroup({
      name: new FormControl(['', Validators.required])
    });
  }

  remove(id: any) {
    this.authors = this.authors.filter(author => String(author._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.authors);
  }

  onEditAuthor() {
    this.current.name = this.registerForm.get('name').value;
    this.modalService.dismissAll();
  }

  openEditAuthor(author: Author) {
    this.current = author;
    this.registerForm.controls['name'].setValue(author.name);
    this.openModal(this.editTemplate, 'modal-edit-author');
  }

  onNewAuthor() {
    const author = new Author();
    author.name = this.newAuthorForm.get('name').value;
    author._id = String(Number(this.authors[this.authors.length - 1]._id) + 1);

    this.authors.push(author);
    this.dataSource = new MatTableDataSource(this.authors);
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
