import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../models/book/book';
import { DataBookService } from '../../models/book/data-book.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  @ViewChild('editBook', {static: false}) editTemplate: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Book>;
  books: Book[];

  displayedColumns: string[] = ['id', 'title', 'author', 'num_pages', 'genre', 'provider', 'publication_date', 'action'];
  registerForm: FormGroup;
  newForm: FormGroup;
  current: Book;

  constructor(private modalService: NgbModal, private dataService: DataBookService) { }

  ngOnInit() {
    this.dataService.getBooks().subscribe(
      result => {
        this.books = result.books;
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.newForm = new FormGroup({
      title: new FormControl(['', Validators.required]),
      author: new FormControl(['', Validators.required]),
      num_pages: new FormControl(['', Validators.required]),
      genre: new FormControl(['', Validators.required]),
      cover_image: new FormControl(['', Validators.required]),
      provider: new FormControl(['', Validators.required]),
      summary: new FormControl(['', Validators.required]),
      publication_date: new FormControl(['', Validators.required]),
    });

    this.registerForm = new FormGroup({
      _id: new FormControl(['', Validators.required]),
      title: new FormControl(['', Validators.required]),
      author: new FormControl(['', Validators.required]),
      num_pages: new FormControl(['', Validators.required]),
      genre: new FormControl(['', Validators.required]),
      cover_image: new FormControl(['', Validators.required]),
      provider: new FormControl(['', Validators.required]),
      summary: new FormControl(['', Validators.required]),
      publication_date: new FormControl(['', Validators.required]),
    });
  }


  remove(id: any) {
    this.dataService.deleteBook(id)
      .subscribe(() => {
          this.books.forEach((item, index) => {
            if (item._id === id) {
              this.books.splice(index, 1);
            }
          });

          this.dataSource.data = this.books;
        }
      );
  }

  onEditBook() {
    const toUpdate = [];

    if (this.current.title !== this.registerForm.get('title').value) {
      this.current.title = this.registerForm.get('title').value;
      toUpdate.push({propName: "title", value: this.registerForm.get('title').value});
    }

    if (this.current.author !== this.registerForm.get('author').value) {
      this.current.author = this.registerForm.get('author').value;
      toUpdate.push({propName: "author", value: this.registerForm.get('author').value});
    }

    if (this.current.num_pages !== this.registerForm.get('num_pages').value) {
      this.current.num_pages = this.registerForm.get('num_pages').value;
      toUpdate.push({propName: "num_pages", value: this.registerForm.get('num_pages').value});
    }

    if (this.current.genre !== this.registerForm.get('genre').value) {
      this.current.genre = this.registerForm.get('genre').value;
      toUpdate.push({propName: "genre", value: this.registerForm.get('genre').value});
    }

    if (this.current.cover_image !== this.registerForm.get('cover_image').value) {
      this.current.cover_image = this.registerForm.get('cover_image').value;
      toUpdate.push({propName: "cover_image", value: this.registerForm.get('cover_image').value});
    }

    if (this.current.provider !== this.registerForm.get('provider').value) {
      this.current.provider = this.registerForm.get('provider').value;
      toUpdate.push({propName: "provider", value: this.registerForm.get('provider').value});
    }

    if (this.current.summary !== this.registerForm.get('summary').value) {
      this.current.summary = this.registerForm.get('summary').value;
      toUpdate.push({propName: "summary", value: this.registerForm.get('summary').value});
    }

    if (this.current.publication_date !== this.registerForm.get('publication_date').value) {
      this.current.publication_date = this.registerForm.get('publication_date').value;
      toUpdate.push({propName: "publication_date", value: this.registerForm.get('publication_date').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateBook(this.current._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.books;
          this.modalService.dismissAll();
        }
      );
  }

  openEditBook(book: Book) {
    this.current = book;
    this.registerForm.controls['title'].setValue(this.current.title);
    this.registerForm.controls['author'].setValue(this.current.author);
    this.registerForm.controls['num_pages'].setValue(this.current.num_pages);
    this.registerForm.controls['genre'].setValue(this.current.genre);
    this.registerForm.controls['cover_image'].setValue(this.current.cover_image);
    this.registerForm.controls['provider'].setValue(this.current.provider);
    this.registerForm.controls['summary'].setValue(this.current.summary);
    this.registerForm.controls['publication_date'].setValue(this.current.publication_date);

    this.openModal(this.editTemplate, 'modal-edit-books');
  }

  onNewBook() {
    if (this.newForm.invalid) {
      return;
    }

    const book = new Book();

    book.title = this.newForm.get('title').value;
    book.author = this.newForm.get('author').value;
    book.num_pages = this.newForm.get('num_pages').value;
    book.genre = this.newForm.get('genre').value;
    book.cover_image = this.newForm.get('cover_image').value;
    book.provider = this.newForm.get('provider').value;
    book.summary = this.newForm.get('summary').value;
    book.publication_date = new Date();

    this.dataService.newBook(book)
      .subscribe(res => {
          this.books.push(res['createdBook']);
          this.dataSource.data = this.books;
        }, (err) => {
          console.log(err);
        }
      );
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
