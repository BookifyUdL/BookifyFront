import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataCommentService {
  // 5ddc11729c96ef2016afb54c, USER
  private commentUrl = `http://${environment.apiHost}:${environment.apiPort}/comments`;

  constructor( private http: HttpClient ) { }

  getComments(): Observable<any> {
    return this.http.get<Comment[]>(this.commentUrl);
  }

  getComment(id: any): Observable<Comment> {
    const url = `${this.commentUrl}/${id}`;
    return this.http.get<Comment>(url, httpOptions);
  }

  deleteComment(id: any): Observable<Comment> {
    const url = `${this.commentUrl}/${id}`;
    return this.http.delete<Comment>(url, httpOptions);
  }

  updateComment(id: any, fields: any[]): Observable<Comment> {
    const url = `${this.commentUrl}/${id}`;
    return this.http.patch<Comment>(url, fields, httpOptions);
  }

  newComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentUrl, comment);
  }
}
