import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { Auth } from '@angular/fire/auth';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of } from 'rxjs';

describe('AuthSerive', () => {
  let service: AuthService;
  const mockAuth = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: Auth, useValue: mockAuth}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isAuthenticated should start as false', () => {
    expect(service.isAuthenticated()).toBe(false);
  });


  it('should have login and logout functions', () => {
    expect(service.login).toBeDefined();
    expect(service.logout).toBeDefined();
  });
});
