import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieInfoComponent } from './components/movie-info/movie-info';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent

  },

  {
    path: 'movies',
    component: MovieListComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },

  {
    path: 'movies/:id',
    component: MovieInfoComponent,
     ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '**',
    redirectTo: '',
  }
];
