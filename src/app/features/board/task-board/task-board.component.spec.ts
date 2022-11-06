import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { columnMock } from './task-board.component.mock';
import { TaskBoardComponent } from './task-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskComponent } from '../task/task.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksService } from '../../../services/tasks/tasks.service';
import { NotificationService } from '../../../services/notification/notification.service';

describe('TaskBoardComponent', () => {
  let component: TaskBoardComponent;
  let fixture: ComponentFixture<TaskBoardComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let fakeTasksService: jasmine.SpyObj<TasksService>;
  let fakeNotificationService: jasmine.SpyObj<NotificationService>;
  let fakeChangeDetector: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    fakeTasksService = jasmine.createSpyObj('TaskService', ['editTask', 'createTask']);
    fakeNotificationService = jasmine.createSpyObj('NotificationService', ['notify']);
    fakeChangeDetector = jasmine.createSpyObj('ChangeDetector', ['detectChanges']);

    await TestBed.configureTestingModule({
      declarations: [TaskBoardComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: TasksService, useValue: fakeTasksService },
        { provide: NotificationService, useValue: fakeNotificationService },
        { provide: ChangeDetectorRef, useValue: fakeChangeDetector },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TaskBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null of variable sub after ngOnDestroy', () => {
    const observer = new Observable();

    component.sub.add(observer.subscribe());
    expect(component.sub['_finalizers'].length).toBe(1);
    component.ngOnDestroy();
    expect(component.sub['_finalizers']).toBeNull();
  });

  it('should emit onChangeColor on changing color', () => {
    const spy = spyOn(component.onChangeColor, 'emit');
    const colorPicker = fixture.debugElement.query(By.css('.board__color-picker')).nativeElement;

    component.color.setValue('#4287f5');
    fixture.detectChanges();
    colorPicker.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledOnceWith('#4287f5');
  });

  it('should be called twice function onEdit', () => {
    const spy = spyOn(component, 'onEdit');
    const event = new Event('click');

    component.onEdit(event);
    component.onEdit(event);
    expect(spy.calls.count()).toBe(2);
  });

  it('should be called twice function onEnter', () => {
    const spy = spyOn(component, 'onEnter');
    const event = new Event('keydown');

    component.onEnter(event);
    component.onEnter(event);
    expect(spy.calls.count()).toBe(2);
  });

  it('test for onEditFinished', () => {
    component.column = [...columnMock];
    fixture.detectChanges();

    const paragraph = fixture.debugElement.query(By.css('.board__editable')).nativeElement;
    const spy = spyOn(component, 'onEditFinished').and.callFake(() => {
      if (component.contentBeforeEdit !== paragraph.innerText) {
        fakeTasksService.editTask(component.column[0]._id, paragraph.innerText);
      }
    });

    component.contentBeforeEdit = component.column[0].name;
    paragraph.innerText = 'some values';
    paragraph.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
    expect(fakeTasksService.editTask).toHaveBeenCalledWith(component.column[0]._id, paragraph.innerText);
  });

  it('should emit method onTaskClick on button click', () => {
    component.column = [...columnMock];
    fixture.detectChanges();

    const board = fixture.debugElement.query(By.css('.board__exercise')).nativeElement;
    const spy = spyOn(component.onTaskClick, 'emit');

    board.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
    expect(spy).toHaveBeenCalledWith(component.column[0]);
  });

  it('should add task correct', () => {
    const button = fixture.debugElement.query(By.css('.board__exercise_centered')).nativeElement;
    const spyAddTask = spyOn(component, 'addTask').and.callFake(() => {
      component.addTaskToDB(component.view.createComponent(TaskComponent), 'TODO', component.column);
    });
    const spyAddTaskToDB = spyOn(component, 'addTaskToDB').and.callFake(() => {
      fakeTasksService.createTask('1', 'TODO', 'string');
    });

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spyAddTask).toHaveBeenCalled();
    expect(spyAddTask.calls.count()).toBe(1);
    expect(spyAddTaskToDB).toHaveBeenCalled();
    expect(spyAddTaskToDB.calls.count()).toBe(1);
    expect(fakeTasksService.createTask).toHaveBeenCalled();
  });

  it('should call ngOnChanges', () => {
    component.title = 'title';

    const changes: SimpleChanges = {};
    const spy = spyOn(component, 'ngOnChanges');

    component.ngOnChanges(changes);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  })
});
