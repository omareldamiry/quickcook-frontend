import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { AuthData } from 'src/app/shared/models/auth-data.model';
import { SignupData } from 'src/app/shared/models/signup-data.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.css']
})
export class AuthPage implements OnInit {

  mode: string = "login";

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn){
      this.router.navigateByUrl("/home");
    }
  }

  toggleMode(newMode: string) {
    this.mode = newMode;
  }

  login(authData: AuthData) {
    this.authService.login(authData).subscribe(result => {
      if(result.code == 1) return;

      this.authService.isLoggedIn = true;
      localStorage.setItem("token", result.data);
      this.router.navigateByUrl("/home");
    });
  }

  signup(signupData: SignupData) {
    this.authService.signup(signupData).subscribe(result => {
      if(result.code == 1) return;

      this.authService.isLoggedIn = true;
      this.router.navigateByUrl("/home");
    });
  }

}
