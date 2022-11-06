import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return loading status true', () => {
    service.show()

    service.loading$
      .subscribe(res => expect(res).toBeTruthy())
  })

  it('should return loading status false', () => {
    service.show();
    service.hide();

    service.loading$
      .subscribe(res => expect(res).toBeFalsy())
  })

  it('should return loading status true after changing it two times', () => {
    service.show();
    service.hide();
    service.show();

    service.loading$
      .subscribe(res => expect(res).toBeTruthy())
  })
});
