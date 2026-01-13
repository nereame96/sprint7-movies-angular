import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies';
import { environment } from '../../environments/environment.development';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MoviesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MoviesService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created and load initial movies', () => {

    const req = httpMock.expectOne(r => r.url.includes('/movie/popular') && r.params.get('page') === '1');
    req.flush({ results: [], total_pages: 1 });

    expect(service).toBeTruthy();
  });

  it('should load MORE movies (page 2)', () => {

    const req1 = httpMock.expectOne(r => r.params.get('page') === '1');
    req1.flush({ results: [{id: 1, title: 'Movie 1'}], total_pages: 5 });


    service.loadPopularMovies();


    const req2 = httpMock.expectOne(r => r.params.get('page') === '2');
    req2.flush({ results: [{id: 2, title: 'Movie 2'}], total_pages: 5 });

    expect(service.popularMovies().length).toBe(2);
  });

  it('should generate the poster URL correctly', () => {

    const req = httpMock.expectOne(r => r.url.includes('/movie/popular'));
    req.flush({ results: [] });

    const path = '/test.jpg';
    const url = service.getPosterUrl(path);
    expect(url).toBe(`${environment.tmdbImageBaseUrl}/w500${path}`);
  });
});
