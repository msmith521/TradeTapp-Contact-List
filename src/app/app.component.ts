import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Matt's awesome contact list";
  contacts = ['Rick', 'Beth', 'Jerry','Summer', 'Morty'] 
}
