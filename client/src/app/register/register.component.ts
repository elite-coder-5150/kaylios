import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormDataBase } from '../models/simple-form-data';
@Component({
  selector: 'ng-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: any = {
    username: null,
    email: null,
    password: null,
  }

  formData: FormDataBase = {
    isSuccessful: false,
    signupFailed: false, 
    loginFailed: false,
    errorMsg: ''
  }

  constructor(private authService: AuthService) {
   
  }
  onSubmit() {
    const { username, email, password, confPass } = this.registerForm;

    if (password.value !== confPass.value) {
      this.formData.errorMsg = "I'm sorry but the password do not match";
      this.formData.isSuccessful = false;
    }

    if (this.registerForm.valid) {
      this.authService.register(username, email, password).subscribe({
        next: data => {
          console.log(data);

          this.formData.isSuccessful = true;
          this.formData.signupFailed = false;
        },
        error: err => {
          this.formData.errorMsg = err.error.message;
          this.formData.isSuccessful = false;
        }
      })
    }
  }
}
