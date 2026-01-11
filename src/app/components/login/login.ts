import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  private router = inject(Router)

  errorMessage = signal('')

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })


  onSubmit() {

    if (this.loginForm.invalid){
      this.errorMessage.set('Please, fulfill all the fields correctly')
      return
    }
    this.errorMessage.set('')

    this.authService.login(this.loginForm.value)
      .then(resp => {
        console.log(resp)
        this.router.navigate(['/movies'])
      })
      .catch(error => {
        console.log(error)
        this.errorMessage.set('Email or password incorrect')
      }
    )

  }
}
