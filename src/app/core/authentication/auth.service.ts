import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/shared/models/auth-data.model';
import { SignupData } from 'src/app/shared/models/signup-data.model';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem("token");
    if(token) this.isLoggedIn = true;
   }

  signup(body: SignupData) {
    return this.apiService.post("/user/signup", body);
  }

  login(body: AuthData, altRoute: string = "user") {
    this.isLoggedIn = true;
    return this.apiService.post(`/${altRoute}/login`, body);
  }

  logout() {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
  }
}
