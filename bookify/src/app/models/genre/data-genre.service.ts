import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from './genre';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataGenreService {

  private genreUrl = `http://${environment.apiHost}:${environment.apiPort}/genres`;

  constructor( private http: HttpClient ) { }

  getGenres(): Observable<any> {
    return this.http.get<Genre[]>(this.genreUrl);
  }

  getGenre(id: any): Observable<Genre> {
    const url = `${this.genreUrl}/${id}`;
    return this.http.get<Genre>(url, httpOptions);
  }

  deleteGenre(id: any): Observable<Genre> {
    const url = `${this.genreUrl}/${id}`;
    return this.http.delete<Genre>(url, httpOptions);
  }

  updateGenre(id: any, fields: any[]): Observable<Genre> {
    const url = `${this.genreUrl}/${id}`;
    return this.http.patch<Genre>(url, fields, httpOptions);
  }

  newGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.genreUrl, genre);
  }
}
