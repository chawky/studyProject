import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environment/environment.component';
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

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    });
  }
  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();
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
  getRefreshToken() {
    const token = JSON.parse(localStorage.getItem('tokenData')!);
    console.log('token ww: ', JSON.stringify(token));
    return this.http
      .post(
        environment.hostUrl + `/refreshtoken`,
        { refreshToken: token.refreshToken },
        httOptions
      )
      .subscribe((res: any) => {
        console.log('token from refresh', res);
        if (res) {
          localStorage.setItem('tokenData', JSON.stringify(res));
          console.log('inrefresh : ', JSON.stringify(res));
          this.$refreshTokenReceived.next(true);
        }
      });
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
