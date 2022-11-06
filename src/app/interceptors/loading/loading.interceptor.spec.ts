import { LoadingInterceptor } from './loading.interceptor';
import { TestBed } from '@angular/core/testing';

describe('LoadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingInterceptor = TestBed.inject(LoadingInterceptor);

    expect(interceptor).toBeTruthy();
  });
});
