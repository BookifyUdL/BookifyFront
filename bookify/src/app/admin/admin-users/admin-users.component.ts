import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user/user';
import { DataUserService } from '../../models/user/data-user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('editUser', {static: false}) editTemplate: ElementRef;

  dataSource: MatTableDataSource<User>;
  users: User[];

  displayedColumns: string[] = ['id', 'name', 'email', 'achievements', 'firebaseId', 'genres', 'interested_books', 'library', 'premium', 'read_book', 'userPicture', 'action'];
  registerForm: FormGroup;
  newForm: FormGroup;
  current: User;

  constructor(private modalService: NgbModal, private dataService: DataUserService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe(
      result => {
        this.users = result.users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      }
    );

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
    this.dataService.deleteUser(id)
      .subscribe(() => {
          this.users.forEach((item, index) => {
            if (item._id === id) {
              this.users.splice(index, 1);
            }
          });

          this.dataSource.data = this.users;
        }
      );
  }

  onEditUser() {
    const toUpdate = [];

    if (this.current.name !== this.registerForm.get('name').value) {
      this.current.name = this.registerForm.get('name').value;
      toUpdate.push({propName: 'name', value: this.registerForm.get('name').value});
    }

    if (this.current.email !== this.registerForm.get('email').value) {
      this.current.email = this.registerForm.get('email').value;
      toUpdate.push({propName: 'email', value: this.registerForm.get('email').value});
    }

    if (this.current.achievements !== this.registerForm.get('achievements').value) {
      this.current.achievements = this.registerForm.get('achievements').value;
      toUpdate.push({propName: 'achievements', value: this.registerForm.get('achievements').value});
    }

    if (this.current.firebaseId !== this.registerForm.get('firebaseId').value) {
      this.current.firebaseId = this.registerForm.get('firebaseId').value;
      toUpdate.push({propName: 'firebaseId', value: this.registerForm.get('firebaseId').value});
    }

    if (this.current.genres !== this.registerForm.get('genres').value) {
      this.current.genres = this.registerForm.get('genres').value;
      toUpdate.push({propName: 'genres', value: this.registerForm.get('genres').value});
    }

    if (this.current.interested_book !== this.registerForm.get('interested_book').value) {
      this.current.interested_book = this.registerForm.get('interested_book').value;
      toUpdate.push({propName: 'interested_book', value: this.registerForm.get('interested_book').value});
    }

    if (this.current.library !== this.registerForm.get('library').value) {
      this.current.library = this.registerForm.get('library').value;
      toUpdate.push({propName: 'library', value: this.registerForm.get('library').value});
    }

    if (this.current.premium !== this.registerForm.get('premium').value) {
      this.current.premium = this.registerForm.get('premium').value;
      toUpdate.push({propName: 'premium', value: this.registerForm.get('premium').value});
    }

    if (this.current.read_book !== this.registerForm.get('read_book').value) {
      this.current.read_book = this.registerForm.get('read_book').value;
      toUpdate.push({propName: 'read_book', value: this.registerForm.get('read_book').value});
    }

    if (this.current.userPicture !== this.registerForm.get('userPicture').value) {
      this.current.userPicture = this.registerForm.get('userPicture').value;
      toUpdate.push({propName: 'userPicture', value: this.registerForm.get('userPicture').value});
    }

    if (toUpdate.length === 0) {
      this.modalService.dismissAll();
      return;
    }

    this.dataService.updateUser(this.current._id, toUpdate)
      .subscribe(res => {
          this.dataSource.data = this.users;
          this.modalService.dismissAll();
        }
      );
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
    user.achievements = [this.registerForm.get('achievements').value];
    user.firebaseId = this.registerForm.get('firebaseId').value;
    user.genres = [this.registerForm.get('genres').value];
    user.interested_book = [this.registerForm.get('interested_book').value];
    user.library = [this.registerForm.get('library').value];
    user.premium = this.registerForm.get('premium').value;
    user.read_book = [this.registerForm.get('read_book').value];
    user.userPicture = this.registerForm.get('userPicture').value;

    this.dataService.newUser(user)
      .subscribe(res => {
          this.users.push(res['createdUser']);
          this.dataSource.data = this.users;
        }, (err) => {
          console.log(err);
        }
      );

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
