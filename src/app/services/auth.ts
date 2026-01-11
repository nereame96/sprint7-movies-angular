import { Injectable, signal, inject, computed } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

private auth = inject(Auth)
isAuthenticated = signal<boolean>(false)

user$ = user(this.auth)

  constructor() {
    this.user$.subscribe(user => {
      this.isAuthenticated.set(!!user)
    })
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  login({ email, password } : any) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout() {
    return signOut(this.auth)
  }



}
