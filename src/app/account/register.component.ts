import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import {  AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AccountService} from "@app/services";

@Component({ templateUrl: 'register.component.html',  styleUrls: ['./login.component.css'] })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService
    ) { }

    get f() { return this.form.controls; }
    get v() { return this.form; }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]],
        }, {validators: this.passwordsEqual});
    }

    passwordsEqual (c: AbstractControl) {
        //safety check
        // carry out the actual date checks here for is-endDate-after-startDate
        // if valid, return null,
        // if invalid, return an error object (any arbitrary name), like, return { invalidEndDate: true }
        // make sure it always returns a 'null' for valid or non-relevant cases, and a 'non-null' object for when an error should be raised on the formGroup
        if(!c) {return null}
        if(!c.value) {return null}
        if(c.value.confirmPassword !== c.value.password) {
            return {invalidPasswords: true}
        } else {
            return null
        }
       }

    register(username: string, password: string, confirmpassword: string): void{
        this.submitted = true;
        console.log(username, password);
        if (confirmpassword === password){
            this.accountService.register(username, password).subscribe(value => {console.log(value); });
        }
        else {
            console.log('Passwords must be equal');
        }


    }

    loginView() {
        this.router.navigate(['account/login']);
    }
}
