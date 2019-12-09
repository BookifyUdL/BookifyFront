import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NavbarService } from '../../navbar/navbar.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  public error: string;

  constructor(private auth: AuthService, private navbar: NavbarService) { }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => {
          this.navbar.show();
        },
        err => {
          console.log(err.error.errors);
          this.error = 'Could not authenticate';
        }
      );
  }

  ngOnInit(): void {
    this.navbar.hide();
  }
}
