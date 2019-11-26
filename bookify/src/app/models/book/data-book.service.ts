import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataBookService {

  private booktUrl = `http://${environment.apiHost}:${environment.apiPort}/books`;

  constructor( private http: HttpClient ) { }

  getBooks(): Observable<any> {
    return this.http.get<Book[]>(this.booktUrl);
  }

  getBook(id: any): Observable<Book> {
    const url = `${this.booktUrl}/${id}`;
    return this.http.get<Book>(url, httpOptions);
  }

  deleteBook(id: any): Observable<Book> {
    const url = `${this.booktUrl}/${id}`;
    return this.http.delete<Book>(url, httpOptions);
  }

  updateBook(id: any, fields: any[]): Observable<Book> {
    const url = `${this.booktUrl}/${id}`;
    return this.http.patch<Book>(url, fields, httpOptions);
  }

  newBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.booktUrl, book);
  }
}
