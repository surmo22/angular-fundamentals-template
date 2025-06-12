import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "@app/user/services/user.service";
import {SessionStorageService} from "@app/auth/services/session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private isAdmin$$ = new BehaviorSubject<boolean>(false);
    private name$$ = new BehaviorSubject<string>('');

    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();
    public name$: Observable<string> = this.name$$.asObservable();

    constructor(
        private userService: UserService,
        private sessionStorageService: SessionStorageService
    ) {}

    getUser() {
        if(this.sessionStorageService.getToken()){
            this.userService.getUser().subscribe((response) => {
                this.isAdmin = response.result.role === 'admin';
                this.name = response.result.name!;
            });
        }
    }

    get isAdmin() {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }

    get name(){
        return this.name$$.getValue();
    }

    set name(value: string){
        this.name$$.next(value);
    }
}
