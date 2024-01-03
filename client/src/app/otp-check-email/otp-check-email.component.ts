import { Component } from '@angular/core';

@Component({
  selector: 'ng-otp-check-email',
  templateUrl: './otp-check-email.component.html',
  styleUrls: ['./otp-check-email.component.scss']
})
export class OtpCheckEmailComponent {
  opt: string = '';

  validateNumericInput()  {
    this.opt = this.opt.replace(/\D/g, '');
  }
}
