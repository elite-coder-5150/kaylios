import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
@Component({
  selector: 'ng-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm:  FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(500)
      ])
    })
  }

  onSubmitSearch() {
    const searchTerm = this.searchForm.get('searchTerm')?.value;

    // TODO: SEND THIS TO THE SERVER
    const formData = {
      searchTerm: searchTerm
    };

    axios.post('/api/search', formData);
  }
}
