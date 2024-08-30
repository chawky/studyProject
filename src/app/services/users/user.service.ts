import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment.component';
import { User } from '../../entities/user';
import swal from 'sweetalert';
import { AuthService } from '../auth/auth.service';
const httOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.$refreshTokenReceived.subscribe((res) => {
      this.getAllUsers();
    });
  }
  user: User[];

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.hostUrl + `/users`);
  }
}
