import { MovieApi } from "../models/movie-api.interface";
import { Movie } from "../models/movie.interface";

export class MovieMapper {

  static mapMovieApiItemtoMovie(item: MovieApi): Movie {
    return {
      genre_ids: item.genre_ids,
      id: item.id,
      overview: item.overview,
      poster_path: item.poster_path,
      popularity: item.popularity,
      release_date: item.release_date,
      title: item.title,
      vote_average: item.vote_average,
      vote_count: item.vote_count
    }
  }

  static mapMovieApiItemtoMovieArray(items: MovieApi[]): Movie[]{
    return items.map(this.mapMovieApiItemtoMovie)
  }
}
