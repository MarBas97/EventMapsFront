import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MyPointer } from '@app/models/myPointer';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MapPointersService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }


    public getAreaPointers(longitude: number, latitude: number): Observable<MyPointer[]> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const params = new HttpParams().set('long', longitude.toString()).set('lat', latitude.toString());

        return this.http.get<MyPointer[]>(`${environment.apiUrl}/api/getareapointers`, {headers, params});
    }

    public addPointer(longitude: number, latitude: number, description: string): Observable<any> {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${environment.apiUrl}/api/addPointer`, {longitude, latitude, description, created_by: null}, {headers});
    }
}
