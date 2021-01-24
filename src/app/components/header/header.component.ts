import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AccountService} from '@app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logButton = 'Zaloguj';

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    setTimeout(() => {
      if (localStorage.getItem('user') === null){
        this.logButton = 'Zaloguj';
      }else {
        this.logButton = 'Wyloguj';
      }
    }, 100);
  }

  mapView() {
    this.router.navigate(['maps/main']);
  }

  myPointersView() {
    this.router.navigate(['maps/mypointers']);
  }

  logout(): void {
    this.logButton = 'Zaloguj';
    this.accountService.logout().subscribe(value => {console.log(value); });
  }

}
