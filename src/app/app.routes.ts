import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieInfoComponent } from './components/movie-info/movie-info';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
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
