import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/shared/models/auth-data.model';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;

  constructor(private apiService:ApiService) {
    const token = localStorage.getItem("token");
    if(token) this.isLoggedIn = true;
   }

  signup(body: any) {
    return this.apiService.post("/signup", body);
  }

  login(body: AuthData) {
    return this.apiService.post("/user/login", body);
  }

  logout() {}
}
