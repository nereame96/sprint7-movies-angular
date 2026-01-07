import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieInfoComponent } from './components/movie-info/movie-info';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent

  },

  {
    path: 'movies',
    component: MovieListComponent,
  },

  {
    path: 'movies/:id',
    component: MovieInfoComponent,
  },

  {
    path: '**',
    redirectTo: '',
  }
];
