import { Component } from '@angular/core';
import { NewsletterService } from '../services/newsletter.service';
import { NewsletterFormData } from '../models/newsletter-form-data';
import { FormDataBase } from '../models/simple-form-data';
@Component({
  selector: 'ng-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  public form: any = {
    userName: null,
    email: null,
  }

  public isSuccessful: boolean = false;
  public signUpFailed: boolean = false;
  public errorMsg: string = '';

  newsletterFormData: NewsletterFormData = {
    name: '',
    email: '',
    subscribeDate: new Date(),
    isSuccessful: false,
    subscriptionFailed: false,
    errorMsg: ''

  }

  constructor(private nls: NewsletterService) {}

  onSubmit() {
    const { userName, email } = this.form;

    this.nls.subscribe(userName, email).subscribe({
      next: data => {
        console.log(data);

        this.newsletterFormData.isSuccessful = true;
        this.newsletterFormData.subscriptionFailed = false;
      },
      error: err => {
        this.newsletterFormData.errorMsg = err.error.message;
        this.newsletterFormData.subscriptionFailed = true;
      }
    })
  }
  
}
