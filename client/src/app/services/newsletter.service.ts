import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterFormData } from '../models/newsletter-form-data'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = "http://localhost:3000/newsletter";
  constructor(private http: HttpClient) { }




  subscribe(newsletterFormData: NewsletterFormData): Observable<any> {
    return this.http.post(this.apiUrl, newsletterFormData )
  }
}
