import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css']
})
export class AdminGenresComponent implements OnInit {

  dataSource: string[] = ['aasdas', 'asdasd'];
  displayedColumns: string[] = ['id', 'name', 'action'];

  constructor() { }

  ngOnInit() {
  }

}
