import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
    selector: 'ng-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent {
    constructor(public fb: FormBuilder) {
        this.contactForm = fb.group({});
    }
    contactForm: FormGroup;

    onSubmit() {}
}
