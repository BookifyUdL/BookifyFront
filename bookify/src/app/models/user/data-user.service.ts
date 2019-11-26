import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/users`;

  constructor( private http: HttpClient ) { }

  getUsers(): Observable<any> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id: any): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url, httpOptions);
  }

  deleteUser(id: any): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url, httpOptions);
  }

  updateUser(id: any, fields: any[]): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<User>(url, fields, httpOptions);
  }

  newUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
}
