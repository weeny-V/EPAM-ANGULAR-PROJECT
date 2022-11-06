import { PromptComponent } from './prompt.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MODAL_DATA } from '../../services/modal/modal.service';

describe('PromptComponent', () => {
  let component: PromptComponent;
  let fixture: ComponentFixture<PromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptComponent ],
      providers: [
        { provide: MODAL_DATA, useValue: { data: undefined } },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work correct on call method closeMe', () => {
    const event = spyOn(component.closeMeEvent, 'emit');

    component.closeMe();
    fixture.detectChanges();
    expect(event).toHaveBeenCalledWith();
  });

  it('should work correct on call method delete', () => {
    const event = spyOn(component.closeMeEvent, 'emit');

    component.delete();
    fixture.detectChanges();
    expect(event).toHaveBeenCalledWith(true);
  })
});
