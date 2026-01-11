import { Injectable, signal, inject, computed } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated'

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(private auth: Auth) {}

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
