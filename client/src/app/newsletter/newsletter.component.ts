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
  private apiUrl = "http://localhost:3000/newsletter";

  constructor(private nls: NewsletterService) {}

  subscribe(newsletterFormData: NewsletterFormData): void {
    axios.post(this.apiUrl, newsletterFormData)
      .then(response => {
        console.log('data sent successfully', response.data);
      }).catch(err => {
        console.error('error sending data', err);
      });
  }
}
