import { Component } from '@angular/core';


import { AccountService } from './services';
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  constructor(private accountService: AccountService) {
  }

  logout() {
      console.log(this.accountService.logout());
  }
}
