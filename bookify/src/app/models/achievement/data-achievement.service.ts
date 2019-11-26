import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {Achievement} from './achievements';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataAchievementService {

  private baseUrl = `http://${environment.apiHost}:${environment.apiPort}/achievements`;

  constructor( private http: HttpClient ) { }

  getAchievements(): Observable<any> {
    return this.http.get<Achievement[]>(this.baseUrl);
  }

  getAchievement(id: any): Observable<Achievement> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Achievement>(url, httpOptions);
  }

  deleteAchievement(id: any): Observable<Achievement> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Achievement>(url, httpOptions);
  }

  updateAchievement(id: any, fields: any[]): Observable<Achievement> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.patch<Achievement>(url, fields, httpOptions);
  }

  newAchievement(achievement: Achievement): Observable<Achievement> {
    return this.http.post<Achievement>(this.baseUrl, achievement);
  }
}
