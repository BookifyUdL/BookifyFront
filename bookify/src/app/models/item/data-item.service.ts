import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataItemService {

  private genreUrl = `http://${environment.apiHost}:${environment.apiPort}/items`;

  constructor() { }
}
