import { Injectable } from '@angular/core';
import {ApiResponse} from "@shared/models/api-response";
import {Observable} from "rxjs";
import {User} from "@shared/models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient){}
    getUser(): Observable<ApiResponse<User>> {
        return this.http.get<ApiResponse<User>>(`/users/me`);
    }
}
