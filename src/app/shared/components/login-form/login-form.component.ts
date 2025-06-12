import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from "@app/auth/services/auth.service";
import {Router} from "@angular/router";
import {UserStoreService} from "@app/user/services/user-store.service";
import {User} from "@shared/models/user.model";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  formFields = {
    email: 'email',
    password: 'password'
  }

  emailControl: string = "";
  passwordControl: string = "";

  constructor(private authService: AuthService,
              private userStoreService: UserStoreService,
              private router: Router) {
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    const user: User = {
      email: this.emailControl,
      password: this.passwordControl,
    }
    this.authService.login(user).subscribe(
        {
          next: (response) => {
            if (response.successful) {
              this.router.navigate(['/courses']).catch(() => {});
              this.userStoreService.getUser();
            }
          },
          error: () => {
            this.loginForm.reset();
          }
        }
    )
  }

  navigateToRegistration() {
    this.router.navigate(['/registration']);
  }
}
