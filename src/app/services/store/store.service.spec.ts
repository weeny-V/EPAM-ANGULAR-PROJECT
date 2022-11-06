import { StoreService } from './store.service';
import { storeMock } from './store.service.mock';
import { TestBed } from '@angular/core/testing';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty object', () => {
    expect(service.getUser()).toBeUndefined();
  });

  it('should return non empty user object', () => {
    service.setUserInfo(storeMock)
    expect(service.getUser()).toEqual(storeMock);
  });
});
