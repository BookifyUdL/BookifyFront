import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Book} from '../../models/book/book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {


  @ViewChild('editUser', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<User>;
  users: User[] = [
    {_id: '1', name: 'radu', email: 'rgoldentime@asd', achievements: [], firebaseId: '', genres: [], interested_book: [], library: [], premium: false, read_book: [], userPicture: ''},
    {_id: '2', name: 'oscar', email: 'oscar@asd', achievements: [], firebaseId: '', genres: [], interested_book: [], library: [], premium: false, read_book: [], userPicture: ''},
    {_id: '3', name: 'marc', email: 'marc@asd', achievements: [], firebaseId: '', genres: [], interested_book: [], library: [], premium: false, read_book: [], userPicture: ''},
    {_id: '4', name: 'high overlord', email: 'bossyboss@asd', achievements: [], firebaseId: '', genres: [], interested_book: [], library: [], premium: true, read_book: [], userPicture: ''},
  ];

  displayedColumns: string[] = ['id', 'name', 'email', 'achievements', 'firebaseId', 'genres', 'interested_books', 'library', 'premium', 'read_book', 'userPicture', 'action'];
  registerForm: FormGroup;
  newForm: FormGroup;
  current: User;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);

    this.newForm = new FormGroup({
      name: new FormControl(['', Validators.required]),
      email: new FormControl(['', Validators.required]),
      achievements: new FormControl(['', Validators.required]),
      firebaseId: new FormControl(['', Validators.required]),
      genres: new FormControl(['', Validators.required]),
      interested_book: new FormControl(['', Validators.required]),
      library: new FormControl(['', Validators.required]),
      premium: new FormControl(['', Validators.required]),
      read_book: new FormControl(['', Validators.required]),
      userPicture: new FormControl(['', Validators.required]),
    });

    this.registerForm = new FormGroup({
      _id: new FormControl(['', Validators.required]),
      name: new FormControl(['', Validators.required]),
      email: new FormControl(['', Validators.required]),
      achievements: new FormControl(['', Validators.required]),
      firebaseId: new FormControl(['', Validators.required]),
      genres: new FormControl(['', Validators.required]),
      interested_book: new FormControl(['', Validators.required]),
      library: new FormControl(['', Validators.required]),
      premium: new FormControl(['', Validators.required]),
      read_book: new FormControl(['', Validators.required]),
      userPicture: new FormControl(['', Validators.required]),
    });
  }


  remove(id: any) {
    this.users = this.users.filter(user => String(user._id) !== String(id));
    this.dataSource = new MatTableDataSource(this.users);
  }

  onEditUser() {
    this.current.name = this.registerForm.get('name').value;
    this.current.email = this.registerForm.get('email').value;
    this.current.achievements = this.registerForm.get('achievements').value;
    this.current.firebaseId = this.registerForm.get('firebaseId').value;
    this.current.genres = this.registerForm.get('genres').value;
    this.current.interested_book = this.registerForm.get('interested_book').value;
    this.current.library = this.registerForm.get('library').value;
    this.current.premium = this.registerForm.get('premium').value;
    this.current.read_book = this.registerForm.get('read_book').value;
    this.current.userPicture = this.registerForm.get('userPicture').value;
    this.modalService.dismissAll();
  }

  openEditUser(user: User) {
    this.current = user;
    this.registerForm.controls['name'].setValue(this.current.name);
    this.registerForm.controls['email'].setValue(this.current.email);
    this.registerForm.controls['achievements'].setValue(this.current.achievements);
    this.registerForm.controls['firebaseId'].setValue(this.current.firebaseId);
    this.registerForm.controls['genres'].setValue(this.current.genres);
    this.registerForm.controls['interested_book'].setValue(this.current.interested_book);
    this.registerForm.controls['library'].setValue(this.current.library);
    this.registerForm.controls['premium'].setValue(this.current.premium);
    this.registerForm.controls['read_book'].setValue(this.current.read_book);
    this.registerForm.controls['userPicture'].setValue(this.current.userPicture);

    this.openModal(this.editTemplate, 'modal-edit-users');
  }

  onNewUser() {
    const user = new User();

    user.name = this.registerForm.get('name').value;
    user.email = this.registerForm.get('email').value;
    user.achievements = this.registerForm.get('achievements').value;
    user.firebaseId = this.registerForm.get('firebaseId').value;
    user.genres = this.registerForm.get('genres').value;
    user.interested_book = this.registerForm.get('interested_book').value;
    user.library = this.registerForm.get('library').value;
    user.premium = this.registerForm.get('premium').value;
    user.read_book = this.registerForm.get('read_book').value;
    user.userPicture = this.registerForm.get('userPicture').value;

    user._id = String(Number(this.users[this.users.length - 1]._id) + 1);

    this.users.push(user);
    this.dataSource = new MatTableDataSource(this.users);
    this.modalService.dismissAll();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.then((result) => {
      this.registerForm.reset();
      this.newForm.reset();
    }, (reason) => {
      this.registerForm.reset();
      this.newForm.reset();
    });
  }
}
