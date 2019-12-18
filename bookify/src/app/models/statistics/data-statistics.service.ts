import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Statistics} from './statistics';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataStatisticsService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/statistics`;

  constructor( private http: HttpClient ) { }

  getStatistics(): Observable<any> {
    return this.http.get<Statistics[]>(this.baseUrl);
  }

  getStatistic(id: any): Observable<Statistics> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Statistics>(url, httpOptions);
  }

  getStatisticByType(type: any): Observable<any> {
    const url = `${this.baseUrl}/type/${type}`;
    return this.http.get<Statistics>(url, httpOptions);
  }

  deleteStatistic(id: any): Observable<Statistics> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Statistics>(url, httpOptions);
  }

  updateStatistic(id: any, fields: any[]): Observable<Statistics> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Statistics>(url, fields, httpOptions);
  }

  newStatistic(statistic: Statistics): Observable<Statistics> {
    return this.http.post<Statistics>(this.baseUrl, statistic);
  }
}
