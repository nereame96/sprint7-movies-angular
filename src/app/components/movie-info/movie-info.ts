import { Component, inject, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-info',
  imports: [DatePipe, RouterLink],
  templateUrl: './movie-info.html',
  styleUrl: './movie-info.css',
})
export class MovieInfoComponent implements OnInit {

  private route = inject(ActivatedRoute)
  moviesService = inject(MoviesService)
  isLoading = this.moviesService.loadingDetails
  details = this.moviesService.movieDetails
  movieId: number = 0

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    const movieId = +id

    this.moviesService.getMovieDetails(movieId)

  }
}
