import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterFormData } from '../models/newsletter-form-data'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = "http://localhost:8080/newsletter";

  constructor(private http: HttpClient) { }

  subscribe(userName: string, email: string): Observable<any> {
    return this.http.post(this.apiUrl, {userName, email });
  }
}
