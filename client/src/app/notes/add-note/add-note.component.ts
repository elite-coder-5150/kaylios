import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validator } from '@angular/forms';
@Component({
    selector: 'ng-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent {
    addNoteForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.addNoteForm = fb.group({});
    }

    onSubmit() {
        
    }
}
