import {Component, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

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

  onSubmit() {
    if (this.loginForm.valid) {
      this.loginForm.reset();
    }

    console.log(this.loginForm.value);
  }
}
