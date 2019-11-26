import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Review } from './review';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataReviewService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/reviews`;

  constructor( private http: HttpClient ) { }

  getReviews(): Observable<any> {
    return this.http.get<Review[]>(this.baseUrl);
  }

  getReview(id: any): Observable<Review> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Review>(url, httpOptions);
  }

  deleteReview(id: any): Observable<Review> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Review>(url, httpOptions);
  }

  updateReview(id: any, fields: any[]): Observable<Review> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Review>(url, fields, httpOptions);
  }

  newReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.baseUrl, review);
  }
}
