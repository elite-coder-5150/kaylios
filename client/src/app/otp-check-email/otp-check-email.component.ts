// TODO: REFACTOR THIS CODE TO WORK PROPERLY.
import { Component } from '@angular/core';
import { EmailService } from '../services/email.service';
@Component({
  selector: 'ng-otp-check-email',
  templateUrl: './otp-check-email.component.html',
  styleUrls: ['./otp-check-email.component.scss']
})
export class OtpCheckEmailComponent {
  opt: string = '';

  constructor(private emailService: EmailService) {}
  validateNumericInput()  {
    this.opt = this.opt.replace(/\D/g, '');
  }


  resend() {
    this.emailService.resendVerificationEmail()
      .subscribe((response) => {
        console.log('email resent successfully: ', response);
      }, (err) => {
        console.error('Error resending verification email: ', err);
      })
  }
}
