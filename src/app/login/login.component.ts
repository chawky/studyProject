import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Route, Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    const credentials = {
      userName: this.userName,
      password: this.password,
    };

    this.auth.login(credentials).subscribe(
      (res) => {
        // debugger;
        console.log('token from login', res);
        if (res) {
          localStorage.setItem('tokenData', JSON.stringify(res));
          this.router.navigate(['/app-layout/app-welcome-page']);
        }
      },
      () => {
        swal('Oops!', 'wrong credentials!', 'error');
      }
    );
  }
}
