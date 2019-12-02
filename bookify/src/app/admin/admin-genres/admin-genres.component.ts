import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Genre } from '../../models/genre/genre';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataGenreService} from '../../models/genre/data-genre.service';

@Component({
  selector: 'app-admin-genres',
  templateUrl: './admin-genres.component.html',
  styleUrls: ['./admin-genres.component.css']
})
export class AdminGenresComponent implements OnInit {

  @ViewChild('editGenre', {static: false}) editGenreTemplate: ElementRef;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: MatTableDataSource<Genre>;
  genres: Genre[];

  displayedColumns: string[] = ['id', 'name', 'picture', 'action'];
  registerForm: FormGroup;
  newGenreForm: FormGroup;
  currentGenre: Genre;

  constructor(private modalService: NgbModal, private dataService: DataGenreService) { }

  ngOnInit() {
    this.dataService.getGenres().subscribe(
      result => {
        this.genres = result.genres;
        this.dataSource = new MatTableDataSource(this.genres);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.registerForm = new FormGroup({
      _id : new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
      picture: new FormControl(['', Validators.required])
    });
    this.newGenreForm = new FormGroup({
      name: new FormControl(['', Validators.required]),
      picture: new FormControl(['', Validators.required])
    });
  }

  remove(id: any) {
    this.dataService.deleteGenre(id)
      .subscribe(() => {
          this.genres.forEach((item, index) => {
            if (item._id === id) {
              this.genres.splice(index, 1);
            }
          });

          this.dataSource.data = this.genres;
        }
      );
  }

  openEditGenre(genre: Genre) {
    this.currentGenre = genre;
    this.registerForm.controls['name'].setValue(genre.name);
    this.registerForm.controls['picture'].setValue(genre.picture);
    this.openModal(this.editGenreTemplate, 'modal-edit-genre');
  }

  onEditGenre() {
    const toUpdate = [];

    if (this.currentGenre.name !== this.registerForm.get('name').value) {
      this.currentGenre.name = this.registerForm.get('name').value;
      toUpdate.push({propName: "name", value: this.registerForm.get('name').value});
    }

    if (this.currentGenre.picture !== this.registerForm.get('picture').value) {
      this.currentGenre.picture = this.registerForm.get('picture').value;
      toUpdate.push({propName: "picture", value: this.registerForm.get('picture').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateGenre(this.currentGenre._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.genres;
          this.modalService.dismissAll();
        }
      );
  }

  onNewGenre() {

    if (this.newGenreForm.invalid) {
      return;
    }

    const genre = new Genre();
    genre.name = this.newGenreForm.get('name').value;
    genre.picture = this.newGenreForm.get('picture').value;


    this.dataService.newGenre(genre)
      .subscribe(res => {
          this.genres.push(res['createdGenre']);
          this.dataSource.data = this.genres;
        }, (err) => {
          console.log(err);
        }
      );

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
