import { Component } from '@angular/core';
import { FormDataBase } from '../models/simple-form-data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: any = {
    username: null,
    password: null,
  };

  loginFormData: FormDataBase = {
    isSuccessful: false,
    signupFailed: false,
    loginFailed: false,
    errorMsg: ''
  };

  constructor() {

  }

  login() {}
}
