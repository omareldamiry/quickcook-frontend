import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAuthData } from 'src/app/shared/models/admin-auth-data.model';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  @Output() authData = new EventEmitter<AdminAuthData>();

  constructor() { }

  ngOnInit(): void {
  }

  submitAuthData() {
    this.authData.emit({
      username: this.username,
      password: this.password
    });
  }

}
