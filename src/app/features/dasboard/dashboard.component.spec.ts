import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { boardsMock, dashboardResponseMock, postResponseMock } from './dashboard.component.mock';
import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BoardService } from '../../services/boards/board.service';
import { LoadingService } from '../../services/loading/loading.service';
import { MODAL_DATA, ModalService } from '../../services/modal/modal.service';
import { NotificationService } from '../../services/notification/notification.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let fakeLoadingService: jasmine.SpyObj<LoadingService>;
  let fakeModalService: jasmine.SpyObj<ModalService>;
  let fakeNotificationService: jasmine.SpyObj<NotificationService>;
  let fakeBoardService: jasmine.SpyObj<BoardService>;

  beforeEach(async () => {
    fakeLoadingService = jasmine.createSpyObj('fakeLoadingService', [], {
      loading$: of(false),
    });
    fakeModalService = jasmine.createSpyObj('fakeModalService', ['open', 'onClose']);
    fakeNotificationService = jasmine.createSpyObj('fakeNotificationService', ['notify']);
    fakeBoardService = jasmine.createSpyObj('fakeBoardService', {
      getBoards: of(boardsMock),
      updateBoard: of(dashboardResponseMock),
      addBoard: of(postResponseMock),
      deleteBoard: of(dashboardResponseMock),
    });

    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
      ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: MODAL_DATA, useValue: { data: undefined } },
        { provide: LoadingService, useValue: fakeLoadingService },
        { provide: ModalService, useValue: fakeModalService },
        { provide: NotificationService, useValue: fakeNotificationService },
        { provide: BoardService, useValue: fakeBoardService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return length null of subscription array after component destroy', () => {
    const observer = new Observable();

    component.subscription.add(observer.subscribe());
    expect(component.subscription['_finalizers'].length).toBe(1);
    component.ngOnDestroy();
    expect(component.subscription['_finalizers']).toBeNull();
  })

  it('should correct call sortByName method', () => {
    spyOn(component, 'sortByName').and.callThrough();
    component.boards = [...boardsMock];
    component.sortByName({
      type: 'name',
      isAsc: true,
      isDesc: false,
    })
    expect(component.boards).toEqual([...boardsMock]);
    component.sortByName({
      type: 'name',
      isAsc: false,
      isDesc: true,
    });
    expect(component.boards).toEqual([...boardsMock].reverse());
  });

  it('should correct call sortByDate method', () => {
    spyOn(component, 'sortByDate').and.callThrough();
    component.boards = [...boardsMock];
    component.sortByDate({
      type: 'date',
      isAsc: true,
      isDesc: false,
    })
    expect(component.boards).toEqual([...boardsMock]);
    component.sortByDate({
      type: 'date',
      isAsc: false,
      isDesc: true,
    });
    expect(component.boards).toEqual([...boardsMock].reverse());
  });

  it('should call method openPrompt on button click', async () => {
    const spy = spyOn(component, 'openPrompt');

    component.boards = [...boardsMock];
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.dashboard__delete')).nativeElement;

    button.click();
    expect(spy).toHaveBeenCalled();
  })

  it('should call method openModal on button click', async () => {
    const spy = spyOn(component, 'openModal');
    const button = fixture.debugElement.query(By.css('.dashboard__create-btn')).nativeElement;

    button.click();
    expect(spy).toHaveBeenCalled();
  })
});
