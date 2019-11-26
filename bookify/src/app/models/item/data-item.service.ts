import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Item} from './item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataItemService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/items`;

  constructor( private http: HttpClient ) { }

  getItems(): Observable<any> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  getItem(id: any): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Item>(url, httpOptions);
  }

  deleteItem(id: any): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Item>(url, httpOptions);
  }

  updateItem(id: any, fields: any[]): Observable<Item> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Item>(url, fields, httpOptions);
  }

  newItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseUrl, item);
  }
}
