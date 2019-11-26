import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Shop } from './shop';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DataShopService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/shops`;

  constructor( private http: HttpClient ) { }

  getShops(): Observable<any> {
    return this.http.get<Shop[]>(this.baseUrl);
  }

  getShop(id: any): Observable<Shop> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Shop>(url, httpOptions);
  }

  deleteShop(id: any): Observable<Shop> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Shop>(url, httpOptions);
  }

  updateShop(id: any, fields: any[]): Observable<Shop> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Shop>(url, fields, httpOptions);
  }

  newShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.baseUrl, shop);
  }
}
