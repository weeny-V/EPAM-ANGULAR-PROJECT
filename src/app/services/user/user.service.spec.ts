import { of } from 'rxjs';
import { UserService } from './user.service';
import * as userMock from './user.service.mock';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let service: UserService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'])

    service = new UserService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return info about current user', (done) => {
    httpClientSpy.get.and.returnValue(of(userMock.getUserInfoMock))

    service.getUserInfo()
      .subscribe({
        next: res => {
          expect(res).toEqual(userMock.getUserInfoMock);
          done();
        },
        error: done.fail
      })

    expect(httpClientSpy.get.calls.count()).toBe(1);
  })
});
