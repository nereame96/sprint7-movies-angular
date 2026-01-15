import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MovieApiResponse } from '../models/movie-api.interface';
import { Movie } from '../models/movie.interface';
import { MovieMapper } from '../mapper/movie.mapper';
import { MovieDetails } from '../models/movie-details.interface';
import { Credits } from '../models/credits.interface';
import { Language } from 'firebase/ai';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {

  private apiUrl = environment.tmdbBaseUrl
  private apiKey = environment.tmdbApiKey
  private imageBaseUrl = environment.tmdbImageBaseUrl
  private http = inject(HttpClient)
  errorMessage = signal<string | null>(null)


  popularMovies = signal<Movie[]>([])
  currentPage = signal<number>(1)
  totalPages = signal<number>(0)
  isLoading = signal<boolean>(false)
  movieDetails = signal<MovieDetails | null>(null)
  movieCredits = signal<Credits | null>(null)
  loadingDetails = signal<boolean>(false)
  loadingCredits = signal<boolean>(false)
  similarMovies = signal<Movie[]>([])
  loadingSimilarMovies = signal<boolean>(false)



  constructor() {
    this.loadPopularMovies()
  }

  loadPopularMovies() {

    if (this.isLoading()) return

    this.isLoading.set(true)

    this.http.get<MovieApiResponse>(`${this.apiUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        language: 'en-EN',
        page: this.currentPage().toString()
      }
    })
    .subscribe({
      next: (resp) => {
      const newMovies = MovieMapper.mapMovieApiItemtoMovieArray(resp.results)

      this.popularMovies.update(movies =>[...movies, ...newMovies] )

      this.totalPages.set(resp.total_pages)
      this.currentPage.update(page => page + 1)
      this.isLoading.set(false)


      },
      error: () => {
      this.errorMessage.set('Error loading movies')
      this.isLoading.set(false)
      }
    })
  }


  getMovieDetails(movieId: number){

    this.loadingDetails.set(true)
    this.movieDetails.set(null)

    this.http.get<MovieDetails>(`${this.apiUrl}/movie/${movieId}`, {
      params: {
        api_key: this.apiKey,
        language: 'en-EN',

      }
    })
    .subscribe({
      next: (resp) => {
        this.movieDetails.set(resp)
        this.loadingDetails.set(false)
      },

    error: () => {
      this.errorMessage.set('Error geting movie details')
      this.loadingDetails.set(false)
    }

    })
  }

  getMovieCredits(movieId: number){

    this.loadingCredits.set(true)
    this.movieDetails.set(null)

    this.http.get<Credits>(`${this.apiUrl}/movie/${movieId}/credits`, {
      params: {
        api_key: this.apiKey,
        language: 'en-EN',
      }
    })
    .subscribe({
      next: (credits) => {
        this.movieCredits.set(credits)
        this.loadingCredits.set(false)
      },

      error: () => {
        this.errorMessage.set('Error geting movie credits')
        this.loadingCredits.set(false)
      }
    })
  }


  getSimilarMovies(movieId: number) {

    this.loadingSimilarMovies.set(true)
    this.similarMovies.set([])

    this.http.get<MovieApiResponse>(`${this.apiUrl}/movie/${movieId}/similar`, {
      params: {
        api_key: this.apiKey,
        Language: 'en-EN',
        page: '1',
      }
    })
    .subscribe({
      next: (resp) => {
        const movies = MovieMapper.mapMovieApiItemtoMovieArray(resp.results)
        this.similarMovies.set(movies.slice(0, 6))
        this.loadingSimilarMovies.set(false)
      },
      error: () => {
        this.errorMessage.set('Error geting similar movies')
        this.loadingSimilarMovies.set(false)
      }
    })
  }

  hasMorePages(): boolean {
    return this.currentPage() <= this.totalPages()
  }

 getImageUrl(path: string | null, size: 'w500' | 'w780' | 'original' = 'w500'): string {
    if (!path) {
      return 'assets/no-image.png';
    }
    return `${this.imageBaseUrl}/${size}${path}`;
  }


  getPosterUrl(path: string | null): string {
    return this.getImageUrl(path, 'w500');
  }

  getBackdropUrl(path: string | null): string {
    return this.getImageUrl(path, 'w780');
  }

  getProfileUrl(path: string | null, size: 'w185' | 'h632' | 'original' = 'w185'): string {
    if (!path) {
      return 'assets/no-image.png';
    }
    return `${this.imageBaseUrl}/${size}${path}`;
  }


}



