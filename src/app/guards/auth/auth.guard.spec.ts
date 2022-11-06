import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/authentication/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let fakeAuthService: jasmine.SpyObj<AuthService>;
  let fakeRouter: jasmine.SpyObj<Router>;
  let fakeUrlsForLoggedUser = ['/', '/dashboard', '/board/1/name'];
  let fakeUrlsForLoggedOutUser = ['/login', '/signup'];

  beforeEach(() => {
    fakeAuthService = jasmine.createSpyObj(
      'fakeAuthService',
      ['setUserLogged', 'setUserLogOut'],
      { logged: false }
    );
    fakeRouter = jasmine.createSpyObj('fakeRouter', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: Router, useValue: fakeRouter },
        AuthGuard,
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('when user is logged in', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValue('exist');
    });

    fakeUrlsForLoggedUser.forEach(fakeUrl => {
      it('should permit access to link', () => {
        const access = guard.checkUrl(fakeUrl);

        expect(access).toBeTruthy();
      })
    })

    fakeUrlsForLoggedOutUser.forEach(fakeUrl => {
      it('', () => {
        const access = guard.checkUrl(fakeUrl);

        expect(access).toBeFalse();
      })
    })
  });

  describe('when user is logged out', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
    });

    fakeUrlsForLoggedUser.forEach(fakeUrl => {
      it('', () => {
        const access = guard.checkUrl(fakeUrl);

        expect(access).toBeFalse();
      })
    })

    fakeUrlsForLoggedOutUser.forEach(fakeUrl => {
      it('should permit access to link', () => {
        const access = guard.checkUrl(fakeUrl);

        expect(access).toBeTruthy();
      })
    })
  });
});
