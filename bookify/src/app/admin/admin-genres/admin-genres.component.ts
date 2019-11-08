import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Genre } from '../../genre/genre';
import { MatTableDataSource } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css']
})
export class AdminGenresComponent implements OnInit {

  @ViewChild('editGenre', {static: false}) editGenreTemplate: ElementRef;

  dataSource: MatTableDataSource<Genre>;
  genres: Genre[] = [
    {_id : '1', name: 'Drama'},
    {_id : '2', name: 'SciFi'},
    {_id : '3', name: 'Tech'},
    {_id : '4', name: 'Comedy'},
  ];

  displayedColumns: string[] = ['id', 'name', 'action'];
  registerForm: FormGroup;
  newGenreForm: FormGroup;
  myControl = new FormControl();
  currentGenre: Genre;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.genres);

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required])
    });
    this.newGenreForm = new FormGroup({
      name: new FormControl(['', Validators.required])
    });
  }

  remove(id: any) {
    this.genres = this.genres.filter(genre => String(genre._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.genres);
  }

  openEditGenre(genre: Genre) {
    this.myControl.setValue(genre.name);
    this.currentGenre = genre;
    this.openModal(this.editGenreTemplate, 'modal-edit-genre');
  }

  onEditGenre() {
    this.currentGenre.name = this.registerForm.get('name').value;
    this.modalService.dismissAll();
  }

  onNewGenre() {
    const genre = new Genre();
    genre.name = this.newGenreForm.get('name').value;
    genre._id = String(Number(this.genres[this.genres.length - 1]._id) + 1);
    this.genres.push(genre);
    this.dataSource = new MatTableDataSource(this.genres);
    this.modalService.dismissAll();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
      this.registerForm.reset();
      this.newGenreForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newGenreForm.reset();
    });
  }
}
