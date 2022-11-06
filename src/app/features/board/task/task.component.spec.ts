import { By } from '@angular/platform-browser';
import { TaskComponent } from './task.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit createTask correctly in method checkValueOfNewTask and delete textarea', () => {
    spyOn(component, 'onBlur').and.callFake(() => {});

    const spy = spyOn(component.createTask, 'emit');

    component.checkValueOfNewTask()
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit createTask correctly in method checkValueOfNewTask and create textarea', () => {
    spyOn(component, 'onBlur').and.callFake(() => {});

    const spy = spyOn(component.createTask, 'emit');
    const textarea = fixture.debugElement.query(By.css('.board__textarea')).nativeElement;

    textarea.value = 'string';
    component.checkValueOfNewTask();
    expect(spy).toHaveBeenCalledWith('string');
  })

  it('should call method onBlur on blur textarea', () => {
    const spy = spyOn(component, 'onBlur');
    const textarea = fixture.debugElement.query(By.css('.board__textarea')).nativeElement;

    textarea.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
  });
});
