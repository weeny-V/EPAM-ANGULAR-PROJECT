import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return notification', () => {
    const spy = spyOn(service, 'notify');

    service.notify('string')

    service.getObservable()
      .subscribe(res => expect(res).toEqual({
        id: 0,
        message: 'string',
        timeout: 3000,
      }))

    expect(spy.calls.count()).toBe(1);
  })
});
