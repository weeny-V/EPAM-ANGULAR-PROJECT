import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDescriptionComponent } from './task-description.component';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddCommentRequest, GetCommentsRequest, SimpleRequest } from '../../../types/main';
import { TasksService } from '../../../services/tasks/tasks.service';
import { StoreService } from '../../../services/store/store.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { CommentService } from '../../../services/comment/comment.service';
import { NotificationService } from '../../../services/notification/notification.service';

describe('TaskDescriptionComponent', () => {
  let component: TaskDescriptionComponent;
  let fixture: ComponentFixture<TaskDescriptionComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let fakeCommentService: jasmine.SpyObj<CommentService>;
  let fakeTasksService: jasmine.SpyObj<TasksService>;
  let fakeStoreService: jasmine.SpyObj<StoreService>;
  let fakeNotificationService: jasmine.SpyObj<NotificationService>;
  let fakeLoadingService: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    fakeCommentService = jasmine.createSpyObj('CommentService', [
      'getComments',
      'addComment',
      'deleteComment'
    ]);
    fakeTasksService = jasmine.createSpyObj('TasksService', ['deleteTask', 'updateArchive']);
    fakeStoreService = jasmine.createSpyObj('StoreService',['getUser']);
    fakeNotificationService = jasmine.createSpyObj('NotificationService', ['notify']);
    fakeLoadingService = jasmine.createSpyObj('LoadingService', [],{
      loading$: of([false]),
    });

    await TestBed.configureTestingModule({
      declarations: [TaskDescriptionComponent],
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: CommentService, useValue: fakeCommentService },
        { provide: TasksService, useValue: fakeTasksService },
        { provide: StoreService, useValue: fakeStoreService },
        { provide: LoadingService, useValue: fakeLoadingService },
        { provide: NotificationService, useValue: fakeNotificationService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TaskDescriptionComponent);
    component = fixture.componentInstance;
    fakeCommentService.getComments.and.callFake(() => {
      return new Observable<GetCommentsRequest>()
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null subscription after ngOnDestroy', () => {
    const observer = new Observable();
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();

    component.sub.add(observer.subscribe());
    expect(component.sub['_finalizers'].length).toBe(2);
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.sub['_finalizers']).toBeNull();
  });

  it('should call some methods inside ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(fakeCommentService.getComments).toHaveBeenCalled();
  });

  it('should emit closeCard on button click', () => {
    const button = fixture.debugElement.query(By.css('.card__close')).nativeElement;
    const spy = spyOn(component.closeCard, 'emit');

    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should work correct with KeyBoard events', () => {
    const comment = fixture.debugElement.query(By.css('.card__comment')).nativeElement;
    const spy = spyOn(component, 'addComment');

    component.comment.setValue('q');
    comment.dispatchEvent(new KeyboardEvent('keydown', { key: 'q' }));
    fixture.detectChanges();
    expect(spy).not.toHaveBeenCalled();
    comment.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should on addComment call service\'s method', () => {
    fakeCommentService.addComment.and.callFake(() => new Observable<AddCommentRequest>());
    component.card = {
      _id: 'string',
      boardID: 'string',
      name: 'string',
      status: 'string',
      createdAt: 'string',
      isArchived: false,
    };
    component.user = {
      _id: 'string',
      username: 'string',
      createdDate: 'string',
    }
    component.addComment();
    fixture.detectChanges();
    expect(fakeCommentService.addComment).toHaveBeenCalled();
  });

  it('should on deleteComment call service\'s method', () => {
    fakeCommentService.deleteComment.and.callFake(() => new Observable<SimpleRequest>());
    component.deleteComment({
      _id: 'string',
      taskID: 'string',
      from: 'string',
      message: 'string',
      createdAt: 'string',
      photo: null,
    });
    expect(fakeCommentService.deleteComment).toHaveBeenCalled();
  })

  it('should on deleteTask call service\'s method', () => {
    fakeTasksService.deleteTask.and.callFake(() => new Observable<SimpleRequest>());
    component.card = {
      _id: 'string',
      boardID: 'string',
      name: 'string',
      status: 'string',
      createdAt: 'string',
      isArchived: false,
    };
    fixture.detectChanges();
    component.deleteTask();
    expect(fakeTasksService.deleteTask).toHaveBeenCalled();
  });

  it('should on updateArchive call service\'s method', () => {
    fakeTasksService.updateArchive.and.callFake(() => new Observable<SimpleRequest>());
    component.card = {
      _id: 'string',
      boardID: 'string',
      name: 'string',
      status: 'string',
      createdAt: 'string',
      isArchived: false,
    };
    fixture.detectChanges();
    component.updateArchive();
    expect(fakeTasksService.updateArchive).toHaveBeenCalled();
  });
});
