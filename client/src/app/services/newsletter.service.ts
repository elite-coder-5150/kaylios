import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterFormData } from '../models/newsletter-form-data'
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = "http://localhost:3000/newsletter";
  constructor() { }

  // TODO: use promises not observables
  subscribe(newsletterFormData: NewsletterFormData) {}
}
