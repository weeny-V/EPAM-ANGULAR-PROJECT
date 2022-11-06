import { Observable, of } from 'rxjs';
import { BoardComponent } from './board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core';
import { boardMock, doneMock, progressMock, taskMock, todoMock } from './board.component.mock';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TasksService } from '../../services/tasks/tasks.service';
import { BoardService } from '../../services/boards/board.service';
import { LoadingService } from '../../services/loading/loading.service';
import { NotificationService } from '../../services/notification/notification.service';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let fakeBoardService: jasmine.SpyObj<BoardService>;
  let fakeLoadingService: jasmine.SpyObj<LoadingService>;
  let fakeTasksService: jasmine.SpyObj<TasksService>;
  let fakeNotificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    fakeBoardService = jasmine.createSpyObj('fakeBoardService',{
      getBoardById: of({ message: 'string', status: 200, board: boardMock }),
      changeColor: of({ message: 'string', status: 200 }),
    });
    fakeLoadingService = jasmine.createSpyObj('fakeLoadingService', [], {
      loading$: of(false),
    })
    fakeTasksService = jasmine.createSpyObj('fakeTasksService', ['getAllMyTasks']);
    fakeNotificationService = jasmine.createSpyObj('fakeNotificationService', ['notify']);

    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      providers: [
        { provide: BoardService, useValue: fakeBoardService },
        { provide: LoadingService, useValue: fakeLoadingService },
        { provide: TasksService, useValue: fakeTasksService },
        { provide: NotificationService, useValue: fakeNotificationService },
      ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',  () => {
    expect(component).toBeTruthy();
  });

  it('should sort list with task by date correctly', () => {
    component.todo = [...todoMock];
    component.progress = [...progressMock];
    component.done = [...doneMock];

    component.sortByDate({
      type: 'date',
      isAsc: true,
      isDesc: false,
    });

    expect(component.todo).toEqual([...todoMock]);
    expect(component.progress).toEqual([...progressMock]);
    expect(component.done).toEqual([...doneMock]);

    component.sortByDate({
      type: 'date',
      isAsc: false,
      isDesc: true,
    })

    expect(component.todo).toEqual([...todoMock].reverse());
    expect(component.progress).toEqual([...progressMock].reverse());
    expect(component.done).toEqual([...doneMock].reverse());
  });

  it('should sort list with task by name correctly', () => {
    component.todo = [...todoMock];
    component.progress = [...progressMock];
    component.done = [...doneMock];
    component.sortByName({
      type: 'name',
      isAsc: true,
      isDesc: false,
    });

    expect(component.todo).toEqual([...todoMock]);
    expect(component.progress).toEqual([...progressMock]);
    expect(component.done).toEqual([...doneMock]);

    component.sortByName({
      type: 'name',
      isAsc: false,
      isDesc: true,
    })

    expect(component.todo).toEqual([...todoMock].reverse());
    expect(component.progress).toEqual([...progressMock].reverse());
    expect(component.done).toEqual([...doneMock].reverse());
  });

  it('should return null subscription after ngOnDestroy', () => {
    const observer = new Observable();
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();

    fakeBoardService.getBoardById.and.callFake(() => of({ message: 'string', status: 200, board: boardMock }));
    component.sub.add(observer.subscribe());
    component.sub.add(observer.subscribe());
    expect(component.sub['_finalizers'].length).toBe(2);
    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
    expect(component.sub['_finalizers']).toBeNull();
  });

  it('should change color correctly', () => {
    component.board = {
      _id: 'string',
      createdBy: 'string',
      name: 'string',
      description: 'string',
      createdAt: 'string',
      todoColor: 'string',
      progressColor: 'string',
      doneColor: 'string',
    };
    component.changeColor('#485466', 'todoColor');

    expect(fakeBoardService.changeColor).toHaveBeenCalledTimes(1);
    expect(fakeBoardService.changeColor).toHaveBeenCalledWith('string', 'todoColor', '#485466');
  });

  it('should open card', () => {
    const spy = spyOn(component, 'openCard');

    component.openCard(taskMock);
    expect(spy).toHaveBeenCalledWith(taskMock);
    expect(component.cardView).toEqual(jasmine.any(ViewContainerRef));
  })
});
