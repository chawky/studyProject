import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user';
import { environment } from '../../environment/environment.component';
import { AuthService } from '../auth/auth.service';
import { Product } from './../../entities/product';
import { Injectable } from '@angular/core';

const httOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  products: Product[];

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.hostUrl + `/allProductData`);
  }
}
