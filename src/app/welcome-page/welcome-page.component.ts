import { NgFor } from '@angular/common';
import { User } from '../entities/user';
import { UserService } from './../services/users/user.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment.component';
import { HttpClient } from '@angular/common/http';
import { ProductUploadService } from '../services/products/product-upload.service';
import { ProductService } from '../services/products/productService';
import { Product } from '../entities/product';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css',
})
export class WelcomePageComponent implements OnInit {
  users: any;
  products: Product[];
  base64String: string;
  imageUrl: string;
  constructor(
    private userService: UserService,
    private productService: ProductService,
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
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      console.log('res !!! ', res);
    });
  }
  convertToImageSrc(imageBytes: Uint8Array[]): string {
    console.log('image picture : ', imageBytes);
    return 'data:image/jpeg;base64,' + imageBytes;
  }

  getAllUsers() {
    this.http.get<User[]>(environment.hostUrl + `/users`).subscribe((res) => {
      this.users = res;
    });
  }
}
