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


  constructor(private nls: NewsletterService) {}

  onSubmit(newsletterFormData:NewsletterFormData) {
   this.nls.subscribe(newsletterFormData)
    .subscribe(data => {
      console.log('form data sent successfully', data);
    }, error => {
      console.log('error submitting form data', error);
    })
  }
  
}
