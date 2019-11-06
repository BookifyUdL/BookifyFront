import { Component, OnInit } from '@angular/core';
import { Genre } from '../../genre/genre';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css']
})
export class AdminGenresComponent implements OnInit {

  dataSource: MatTableDataSource<Genre>;
  genres: Genre[] = [
    {_id : '1', name: 'Drama'},
    {_id : '2', name: 'SciFi'},
    {_id : '3', name: 'Tech'},
    {_id : '4', name: 'Comedy'},
  ];

  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.genres);
  }

  remove(id: any) {
    this.genres = this.genres.filter(genre => String(genre._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.genres);

  }

}
