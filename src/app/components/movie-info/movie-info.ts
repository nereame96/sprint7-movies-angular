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
  credits = this.moviesService.movieCredits
  movieId: number = 0

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    const movieId = +id // pasa de string a numero con el +

    this.moviesService.getMovieDetails(movieId)
    this.moviesService.getMovieCredits(movieId)

  }

  getMainCast(limit: number = 6){
    return this.credits()?.cast.slice(0, limit) || []
  }
}
