import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "@app/auth/services/auth.service";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;
  formFields= {
    name: 'name',
    email: 'email',
    password: 'password',
  }

  constructor(private router: Router,
              private authService: AuthService) {
    this.buildForm();
  }
  // Use the names `name`, `email`, `password` for the form controls.
  buildForm(): void{
    this.registrationForm = new FormGroup({
      [this.formFields.name]: new FormControl('', [Validators.required, Validators.minLength(6)]),
      [this.formFields.email]: new FormControl('', [Validators.required, Validators.email]),
      [this.formFields.password]: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get nameControl(): FormControl {
    return this.registrationForm.get(this.formFields.name) as FormControl;
  }

  get emailControl(): FormControl {
    return this.registrationForm.get(this.formFields.email)! as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registrationForm.get(this.formFields.password)! as FormControl;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          if (response.successful) {
            this.navigateToLogin();
          }
        }
      })
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
