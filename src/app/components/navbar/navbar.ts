import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {

  private authService = inject(AuthService)
  private router = inject(Router)

  isAuthenticated = this.authService.isAuthenticated

  onLogout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate([''])
      })
      .catch(error => console.log(error))
  }

}
