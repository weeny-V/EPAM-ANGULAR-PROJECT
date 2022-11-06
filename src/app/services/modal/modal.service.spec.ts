import { TestBed } from '@angular/core/testing';

import { MODAL_DATA, ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MODAL_DATA, useValue: { data: undefined } },
      ]
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
