import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map, share} from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models';


@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const request = this.http.post<TestUser>(`${environment.apiUrl}/api/login`, { email, password }, {headers})
          .pipe(share());
        request.subscribe(res => {
          localStorage.setItem('user', JSON.stringify(res.user_id));
          const user = new User();
          user.id = res.user_id;
          this.userSubject.next(user);
        }, error => {console.log('error login');
        });
        return request;
    }


    logout(): Observable<any> {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
        return this.http.get<any>(`${environment.apiUrl}/api/logout`);
    }

    register(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(`${environment.apiUrl}/api/register`, { email, password }, {headers});
    }
}

export interface TestUser {
  result: boolean;
  user_id: number;
}
