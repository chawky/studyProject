import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;

  password: string;
  constructor(private auth: AuthService, private router: Router) {}
  signup() {
    const credentials = {
      firstName: this.userName,
      lastName: this.lastName,
      email: this.email,
      userName: this.userName,
      password: this.password,
      role: ['USER_ROLE', 'MODERATOR_ROLE'],
    };

    this.auth.signup(credentials).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['']);
        }
      },
      () => {
        swal('Oops!', 'wrong credentials!', 'error');
      }
    );
  }
  login() {
    this.router.navigate(['']);
  }
}
