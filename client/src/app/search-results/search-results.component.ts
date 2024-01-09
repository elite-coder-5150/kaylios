import { Component } from '@angular/core';
import { SearchResults } from '../models/search-results';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  results: SearchResults[] = [];
}
