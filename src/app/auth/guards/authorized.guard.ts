import { Injectable } from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import {Observable} from 'rxjs';
import {AuthService} from "@app/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.authService.isAuthorised){
            return true;
        }

        return this.router.createUrlTree(['/login']);
    }
    // Add your code here
}
