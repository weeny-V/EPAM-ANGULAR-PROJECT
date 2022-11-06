import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { authMock } from './auth.service.mock';
import { HttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AuthService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('on sign up should return status 200 and message', (done) => {
    httpClientSpy.post.and.returnValue(of(authMock.signup));

    service.signup('user1', 'pass')
      .subscribe({
        next: res => {
          expect(res).toEqual(authMock.signup);
          done();
        },
        error: done.fail,
      })

    expect(httpClientSpy.post.calls.count()).toBe(1);
  })

  it('on log in should return status 200, message and jwt_token', (done) => {
    httpClientSpy.post.and.returnValue(of(authMock.login));

    service.login('user1', 'pass')
      .subscribe({
        next: res => {
          expect(res).toEqual(authMock.login);
          done();
        },
        error: done.fail,
      });

    expect(httpClientSpy.post.calls.count()).toBe(1);
  })
});
