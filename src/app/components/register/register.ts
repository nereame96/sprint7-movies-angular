import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth';
import { passwordMatchValidator } from '../../validators/password-match.validator';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

  fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  errorMessage = signal('')


  registerForm = this.fb.group({
    userName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: passwordMatchValidator()
  })



  onSubmit() {

    if (this.registerForm.invalid) {

      if (this.registerForm.hasError('passwordMismatch')) {
        this.errorMessage.set('Passwords do not match')
        return
      }

      this.errorMessage.set('Please, fulfill all the fields correctly')
      return
    }

    this.errorMessage.set('')

    const {email, password} = this.registerForm.value

    this.authService.register({email, password})
      .then(resp => {
        console.log(resp)
        this.router.navigate(['/movies'])
      })
      .catch(error => {
        console.log(error)

        if (error.code === 'auth/email-already-in-use') {
          this.errorMessage.set('This email is already registered')
        } else if (error.code === 'auth/weak-password') {
          this.errorMessage.set('Password too weak (min 6 characters')
        } else {
          this.errorMessage.set('Register error. Please, try again')
        }
      } )

  }
}
