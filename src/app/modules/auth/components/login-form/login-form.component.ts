import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthData } from 'src/app/core/models/auth-data.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email: string = "";
  password: string = "";

  @Output() authData = new EventEmitter<AuthData>();
  @Output() mode = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  submitAuthData() {
    this.authData.emit({
      email: this.email,
      password: this.password
    });
  }

  switchToSignup() {
    this.mode.emit('signup');
  }

}
