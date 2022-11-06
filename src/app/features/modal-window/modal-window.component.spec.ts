import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalWindowComponent } from './modal-window.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MODAL_DATA } from '../../services/modal/modal.service';

describe('ModalWindowComponent', () => {
  let component: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWindowComponent ],
      providers: [
        { provide: MODAL_DATA, useValue: { data: undefined } },
      ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work correctly after call addBoard', () => {
    const event = spyOn(component.closeMeEvent, 'emit');

    component.addBoard();
    expect(event).toHaveBeenCalled();
  });

  it('should work correctly after call closeMe', () => {
    const event = spyOn(component.closeMeEvent, 'emit');

    component.closeMe();
    fixture.detectChanges();
    expect(event).toHaveBeenCalledWith();
  });

  it('should set all common value after ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callFake(() => {
      if (component.board.data) {
        component.inputName.setValue(component.board.data.name);
        component.isNewItem = false;
      }
    });
    expect(component.inputName.value).toBe('');
    expect(component.isNewItem).toBeTruthy();
    component.board.data = { name: 'board name' };
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.inputName.value).toBe('board name');
    expect(component.isNewItem).toBeFalsy();
  })
});
