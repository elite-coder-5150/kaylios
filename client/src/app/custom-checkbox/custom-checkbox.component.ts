import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent {
  @Input() checked = false;

  toggleCheck() {
    this.checked = !this.checked;
  }
}
