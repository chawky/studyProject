import { NgFor } from '@angular/common';
import { User } from '../user';
import { UserService } from './../services/users/user.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})
export class WelcomePageComponent implements OnInit {
  users: any;
  constructor(
    private userService: UserService,
    private auth: AuthService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
    this.auth.$refreshTokenReceived.subscribe((res) => {
      this.getAllUsers();
    });
    console.log('user list ', this.users);
  }

  getAllUsers() {
    this.http.get<User[]>(environment.hostUrl + `/users`).subscribe((res) => {
      this.users = res;
    });
  }
}
