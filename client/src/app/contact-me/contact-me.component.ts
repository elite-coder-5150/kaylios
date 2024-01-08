import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { parse, parsePhoneNumberFromString } from 'libphonenumber-js'
@Component({
    selector: 'ng-contact-me',
    templateUrl: './contact-me.component.html',
    styleUrls: ['./contact-me.component.scss'],
})
export class ContactMeComponent {
    contactForm: FormGroup;

    constructor() {
        this.contactForm = new FormGroup({
            firstName: new FormControl('', [
                Validators.required, 
                Validators.minLength(3), 
                Validators.maxLength(30)]),
            lastName: new FormControl('', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(30)]),
            email: new FormControl('', [
                Validators.required,
                Validators.email,
                Validators.minLength(3),
                Validators.maxLength(30)]),
            phoneNumber: new FormControl('', [
                Validators.required
            ])
        });
    }

    

    onSubmit() {
        const firstName = this.contactForm.get('firstName')?.value;
        const lastName = this.contactForm.get('lastName')?.value;
        const email = this.contactForm.get('email')?.value;
        const phoneNumber = this.contactForm.get('phoneNumber')?.value;
        const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'US');

        

    }
}
