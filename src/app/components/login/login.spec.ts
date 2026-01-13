import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { LoginComponent } from './login';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
      provideRouter([]),
      { provide: Auth, useValue: { onIdTokenChanged: () => of(null) } }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    router = TestBed.inject(Router)

    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if form is invalid once submited', () => {
    component.loginForm.setValue({ email: '', password: ''})
    component.onSubmit()

    expect(component.errorMessage()).toBe('Please, fulfill all the fields correctly')

  })

  it('should call authService.login and navigate to /movies if the login is valid', async () => {

    const credentials = { email: 'test@test.com', password: 'password123'}
    component.loginForm.setValue(credentials)

    const loginSpy = vi.spyOn(authService, 'login').mockResolvedValue({} as any)
    const navigateSpy = vi.spyOn(router, 'navigate')

    await component.onSubmit()

    expect(loginSpy).toHaveBeenCalledWith(credentials)
    expect(navigateSpy).toHaveBeenCalledWith(['/movies'])

  })

  it('should show error if the login fail', async () => {
    const credentials = { email: 'test@test.com', password: 'password123'}
    component.loginForm.setValue(credentials)

    vi.spyOn(authService, 'login').mockRejectedValue(new Error('Firebase Error'))
    const navigateSpy = vi.spyOn(router, 'navigate')

    await component.onSubmit()

    await fixture.whenStable()

    expect(component.errorMessage()).toBe('Email or password incorrect')

    expect(navigateSpy).not.toHaveBeenCalled()

  })
});
