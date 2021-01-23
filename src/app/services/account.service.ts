import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
        const request = this.http.post<TestUser>(`${environment.apiUrl}/api/login`, { email, password })
          .pipe(share());
        request.subscribe(res => {
          localStorage.setItem('user', JSON.stringify(res.user_id));
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

    //register(user: User) {
    //    return this.http.post(`${environment.apiUrl}/api/register`, user);
    //}
    register(email: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiUrl}/api/register`, { email, password });
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}

export interface TestUser {
  result: boolean;
  user_id: number;
}
