import { Injectable } from '@angular/core';
import {BehaviorSubject, map} from "rxjs";
import {SessionStorageService} from "@app/auth/services/session-storage.service";
import {HttpClient} from "@angular/common/http";
import {ApiResponse} from "@shared/models/api-response";
import {User} from "@shared/models/user.model";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private http: HttpClient,
        private sessionStorage: SessionStorageService,
    ){
        const token = this.sessionStorage.getToken();
        this.isAuthorized$$.next(!!token);
    }

    login(user: User) { // replace 'any' with the required interface
        return this.http.post<ApiResponse<string>>(`${environment.apiBaseUrl}/login`, user)
            .pipe(
                map((response) => {
                    if (response?.successful && response.result){
                        this.sessionStorage.setToken(response.result);
                        this.isAuthorized$$.next(true);
                        this.isAuthorised = true;
                    }

                    return response;
                })
            );
    }

    logout() {
        this.http.delete<void>("/logout").subscribe({
            next: () => {
                this.sessionStorage.deleteToken();
                this.isAuthorized$$.next(false);
                this.isAuthorised = false;
            }
        });
    }

    register(user: User) { // replace 'any' with the required interface
        return this.http.post<ApiResponse<string>>(`${environment.apiBaseUrl}/register`, user)
            .pipe(map((response)=>{
                if(response.successful){
                    console.log(response);
                }

                return response;
            }))
    }

    get isAuthorised() {
        return this.isAuthorized$$.value;
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return "/login";
    }
}
