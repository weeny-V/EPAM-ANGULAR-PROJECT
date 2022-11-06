import { RequestOptionsInterceptor } from './request-token.interceptor';
import { TestBed } from '@angular/core/testing';

describe('RequestTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestOptionsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestOptionsInterceptor = TestBed.inject(RequestOptionsInterceptor);

    expect(interceptor).toBeTruthy();
  });
});
