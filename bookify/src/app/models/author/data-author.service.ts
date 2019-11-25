import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Author } from './author';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataAuthorService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/authors`;

  constructor( private http: HttpClient ) { }

  getAuthors(): Observable<any> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  getAuthor(id: any): Observable<Author> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Author>(url, httpOptions);
  }

  deleteAuthor(id: any): Observable<Author> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Author>(url, httpOptions);
  }

  updateAuthor(id: any, fields: any[]): Observable<Author> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Author>(url, fields, httpOptions);
  }

  newAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(this.baseUrl, author);
  }
}
