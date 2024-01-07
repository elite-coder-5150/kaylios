import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'ng-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor (private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({});
  }

  onSubmit() {
    
  }
}
