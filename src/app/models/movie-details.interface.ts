import { Movie } from "./movie.interface";

export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}
