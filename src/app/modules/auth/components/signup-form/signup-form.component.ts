import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignupData } from 'src/app/shared/models/signup-data.model';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";

  @Input('toggleController') toggle: Function = ()=>{};
  @Output() signupData = new EventEmitter<SignupData>();
  @Output() mode = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  submitSignupData() {
    this.signupData.emit({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }

  switchToLogin() {
    this.mode.emit('login');
  }

}
