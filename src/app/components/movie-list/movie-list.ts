import { Component, HostListener, inject } from '@angular/core';
import { MoviesService } from '../../services/movies';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-movie-list',
  imports: [DatePipe, RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieListComponent {

  moviesService = inject(MoviesService)

  movies = this.moviesService.popularMovies
  isLoading = this.moviesService.isLoading

  @HostListener('window:scroll')

  scroll(){
    const scrollPosition = window.innerHeight + window.scrollY
    const scrollHeight = document.documentElement.scrollHeight

    if(scrollPosition >= scrollHeight - 100) {
      this.loadMore()
    }
  }

  loadMore() {

    if ( this.moviesService.hasMorePages() && !this.isLoading()) {
      this.moviesService.loadPopularMovies()
    }
}

}
