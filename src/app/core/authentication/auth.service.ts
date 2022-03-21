import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/core/models/auth-data.model';
import { SignupData } from 'src/app/core/models/signup-data.model';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if(token) this.isLoggedIn = true;
    if(isAdmin) this.isAdmin = true;
   }

  signup(body: SignupData) {
    this.isLoggedIn = true;
    return this.apiService.post("/user/signup", body);
  }

  login(body: AuthData, altRoute: string = "user") {
    this.isLoggedIn = true;
    return this.apiService.post(`/${altRoute}/login`, body);
  }

  logout() {
    localStorage.clear();
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
