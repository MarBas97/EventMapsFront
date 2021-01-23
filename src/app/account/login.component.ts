import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/services';
import {HeaderComponent} from "@app/components/header/header.component";

@Component({ templateUrl: 'login.component.html' , styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
    ) { }

    username: string;
    password: string;

    ngOnInit(): void {
    }

    registerView(){
        this.router.navigate(['account/register']);
    }

    login() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        this.loading = true;
        this.accountService.login(this.username, this.password)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
    navigateToMap(): void{
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigateByUrl(returnUrl);
    }
}
