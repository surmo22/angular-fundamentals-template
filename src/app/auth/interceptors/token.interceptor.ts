import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {SessionStorageService} from "@app/auth/services/session-storage.service";
import {Router} from "@angular/router";
import {AuthService} from "@app/auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private sessionStorage: SessionStorageService,
        private router: Router,
        private authService: AuthService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();

        let authReq = req;
        if(token){
            authReq = req.clone({
                setHeaders: { Authorization: `${token}` }
            });
        }

        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                    this.router.navigate(['/login']).catch(() => {});
                }
                return throwError(() => error);
            })
        );
    }
}
