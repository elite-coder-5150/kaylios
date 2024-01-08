import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private emailApiUrl = "http://localhost";
  constructor() { }
  resendVerificationEmail(): Observable<any> {
    
    const emailData = {};

    return new Observable((observer) => {
      axios.post(this.emailApiUrl, emailData)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        }).catch((error) => {
          observer.error(error);
        });
    })
  }
}
