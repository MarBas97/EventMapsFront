import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from "@app/services";

@Component({ templateUrl: 'register.component.html', styleUrls: ['./login.component.css'] })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private accountService: AccountService
    ) { }

    get f() { return this.form.controls; }
    get v() { return this.form; }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        }, { validators: this.passwordsEqual });
    }

    passwordsEqual(c: AbstractControl) {
        if (!c) { return null; }
        if (!c.value) { return null; }
        if (c.value.confirmPassword !== c.value.password) {
            return { invalidPasswords: true };
        } else {
            return null;
        }
    }

    register(username: string, password: string, confirmpassword: string): void {
        this.submitted = true;
        console.log(username, password);
        if (confirmpassword === password) {
            this.accountService.register(username, password).subscribe(value => {
                if ( value.result === 'success') {
                    localStorage.setItem('user', JSON.stringify(value.id));
                    this.accountService.userSubject.next(value.id);
                    this.router.navigate(['maps/main']);
                }
            });
        }
        else {
            console.log('Passwords must be equal');
        }


    }

    loginView() {
        this.router.navigate(['account/login']);
    }
}
