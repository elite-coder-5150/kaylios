import { Component } from '@angular/core';
import { Note } from '../models/note';
@Component({
  selector: 'ng-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  private apiUrl = 'http://localhost:300/';

  constructor() {}

  onSubmit() {
    const formData = {

    }
  }
}
