import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../models/book/book';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  @ViewChild('editBook', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<Book>;
  books: Book[] = [
    {_id: '1', title: 'title 1', author: null, extension: 100, genre: null, picture: null, provider: null, summary: 'a book', year: 1000},
    {_id: '2', title: 'title 2', author: null, extension: 200, genre: null, picture: null, provider: null, summary: 'a book', year: 1000},
    {_id: '3', title: 'title 3', author: null, extension: 300, genre: null, picture: null, provider: null, summary: 'a book', year: 1000},
    {_id: '4', title: 'title 4', author: null, extension: 400, genre: null, picture: null, provider: null, summary: 'a book', year: 1000},
  ];

  displayedColumns: string[] = ['id', 'title', 'author', 'extension', 'genre', 'picture', 'provider', 'summary', 'year', 'action'];
  registerForm: FormGroup;
  newForm: FormGroup;
  current: Book;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.books);

    this.newForm = new FormGroup({
      title: new FormControl(['', Validators.required]),
      author: new FormControl(['', Validators.required]),
      extension: new FormControl(['', Validators.required]),
      genre: new FormControl(['', Validators.required]),
      picture: new FormControl(['', Validators.required]),
      provider: new FormControl(['', Validators.required]),
      summary: new FormControl(['', Validators.required]),
      year: new FormControl(['', Validators.required]),
    });

    this.registerForm = new FormGroup({
      _id: new FormControl(['', Validators.required]),
      title: new FormControl(['', Validators.required]),
      author: new FormControl(['', Validators.required]),
      extension: new FormControl(['', Validators.required]),
      genre: new FormControl(['', Validators.required]),
      picture: new FormControl(['', Validators.required]),
      provider: new FormControl(['', Validators.required]),
      summary: new FormControl(['', Validators.required]),
      year: new FormControl(['', Validators.required]),
    });
  }


  remove(id: any) {
    this.books = this.books.filter(book => String(book._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.books);
  }

  onEditBook() {
    this.current.title = this.registerForm.get('title').value;
    this.current.author = this.registerForm.get('author').value;
    this.current.extension = this.registerForm.get('extension').value;
    this.current.genre = this.registerForm.get('genre').value;
    this.current.picture = this.registerForm.get('picture').value;
    this.current.provider = this.registerForm.get('provider').value;
    this.current.summary = this.registerForm.get('summary').value;
    this.current.year = this.registerForm.get('year').value;
    this.modalService.dismissAll();
  }

  openEditBook(book: Book) {
    this.current = book;
    this.registerForm.controls['title'].setValue(this.current.title);
    this.registerForm.controls['author'].setValue(this.current.author);
    this.registerForm.controls['extension'].setValue(this.current.extension);
    this.registerForm.controls['genre'].setValue(this.current.genre);
    this.registerForm.controls['picture'].setValue(this.current.picture);
    this.registerForm.controls['provider'].setValue(this.current.provider);
    this.registerForm.controls['summary'].setValue(this.current.summary);
    this.registerForm.controls['year'].setValue(this.current.year);

    this.openModal(this.editTemplate, 'modal-edit-books');
  }

  onNewBook() {
    const book = new Book();

    book.title = this.newForm.get('title').value;
    book.author = this.newForm.get('author').value;
    book.extension = this.newForm.get('extension').value;
    book.genre = this.newForm.get('genre').value;
    book.picture = this.newForm.get('picture').value;
    book.provider = this.newForm.get('provider').value;
    book.summary = this.newForm.get('summary').value;
    book.year = this.newForm.get('year').value;
    book._id = String(Number(this.books[this.books.length - 1]._id) + 1);

    this.books.push(book);
    this.dataSource = new MatTableDataSource(this.books);
    this.modalService.dismissAll();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.then((result) => {
      this.registerForm.reset();
      this.newForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newForm.reset();
    });
  }
}
