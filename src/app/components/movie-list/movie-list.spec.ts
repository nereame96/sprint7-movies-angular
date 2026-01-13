import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MovieListComponent } from './movie-list';
import { MoviesService } from '../../services/movies';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Title } from '@angular/platform-browser';

describe('MovieList', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  const mockMoviesService = {
    popularMovies: signal([]),
    isLoading: signal(false),
    hasMorePages: vi.fn(),
    loadPopularMovies: vi.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        provideRouter([]),
          { provide: MoviesService, useValue: mockMoviesService }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;

    vi.clearAllMocks();
    mockMoviesService.isLoading.set(false);

    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call loadPopularMvoies once runs loadMore() ', () => {

    mockMoviesService.hasMorePages.mockReturnValue(true)
    mockMoviesService.isLoading.set(false)

    component.loadMore()

    expect(mockMoviesService.loadPopularMovies).toHaveBeenCalled()
  })

  it('should not call loadPopularMovies if it is already loades (isLoading = true)', () => {

    mockMoviesService.isLoading.set(true)
    mockMoviesService.hasMorePages.mockReturnValue(true)

    component.loadMore()

    expect(mockMoviesService.loadPopularMovies).not.toHaveBeenCalled()
  })

  it('should have the movies from the service', () => {

    const moviesFake = [{ id: 1, title: 'Matrix'}] as any
    mockMoviesService.popularMovies.set(moviesFake)

    fixture.detectChanges()

    expect(component.movies().length).toBe(1);
    expect(component.movies()[0].id).toBe(99)
    expect(component.movies()[0].title).toBe('Matrix');
  })


});

