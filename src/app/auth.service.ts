import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment/environment.component';
const httOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public username: string;
  public password: string;
  public loggedIn = false;

  constructor(private http: HttpClient) {}

  isLoggedIn(): Boolean {
    const token = localStorage.getItem('token');
    if (token !== '') {
      const expiry = JSON.parse(atob(token?.split('.')[1]!)).exp;
      this.loggedIn = Math.floor(new Date().getTime() / 1000) >= expiry;
    } else {
      this.loggedIn = false;
    }
    return this.loggedIn;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(
      environment.hostUrl + `/signin`,
      {
        userName: credentials.userName,
        password: credentials.password,
      },
      httOptions
    );
  }
}
