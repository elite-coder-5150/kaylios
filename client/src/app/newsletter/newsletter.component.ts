import { Component } from '@angular/core';
import { NewsletterService } from '../services/newsletter.service';
@Component({
  selector: 'ng-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {
  email: string = '';

  constructor(private nls: NewsletterService) {}

  // subscribe() {
  //   this.nls.subscribe(this.email)
  //     .subscribe(response => {
  //       console.log('', response);
  //     }, err => {})
  // }
}
