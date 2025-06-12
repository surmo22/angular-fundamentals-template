import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiBaseUrlInterceptor} from "@app/auth/interceptors/api-base-url-interceptor.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SessionStorageService,
    AuthService
  ]
})
export class AuthModule { }
