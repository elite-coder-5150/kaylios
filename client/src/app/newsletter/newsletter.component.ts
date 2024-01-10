import { Component } from '@angular/core';
import { NewsletterService } from '../services/newsletter.service';
import { NewsletterFormData } from '../models/newsletter-form-data';
import axios from 'axios';
@Component({
  selector: 'ng-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  showSuccessMessage: boolean = false;

  constructor(private nls: NewsletterService) {}

  onSubmit(newsletterFormData:NewsletterFormData) {
   this.nls.subscribe(newsletterFormData)
    .subscribe(data => {
      console.log('form data sent successfully', data);

      this.showSuccessMessage = true;

      setTimeout(() => {
        this.showSuccessMessage = false
      }, 3000);
    }, error => {
      console.log('error submitting form data', error);
    })
  }
  
}
