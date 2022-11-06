import { Observable, of } from 'rxjs';
import { LayoutComponent } from './layout.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../../services/user/user.service';
import { StoreService } from '../../services/store/store.service';
import { AuthService } from '../../services/authentication/auth.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  let fakeUserService: jasmine.SpyObj<UserService>;
  let fakeStoreService: jasmine.SpyObj<StoreService>;
  let fakeAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    fakeUserService = jasmine.createSpyObj('fakeUserService', {
      getUserInfo: of({ message: 'string', status: 200 })
    });
    fakeStoreService = jasmine.createSpyObj('fakeStoreService', ['setUserInfo']);
    fakeAuthService = jasmine.createSpyObj('fakeAuthService', ['setUserLogged', 'setUserLogOut']);

    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: StoreService, useValue: fakeStoreService },
        { provide: UserService, useValue: fakeUserService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('after component destroy subscription should return null', () => {
    const observer = new Observable();

    component.sub.add(observer.subscribe());
    expect(component.sub['_finalizers'].length).toBe(1);
    component.ngOnDestroy();
    expect(component.sub['_finalizers']).toBeNull();
  });

  it('should change variable isOpen on each button click', () => {
    const menu = fixture.debugElement.query(By.css('.header__auth'));

    expect(component.isOpen).toBeFalsy();
    menu.nativeElement.click();
    expect(component.isOpen).toBeTruthy();
    menu.nativeElement.click();
    expect(component.isOpen).toBeFalsy();
  });

  it('after onInit should be set variable user', () => {
    spyOn(component, 'ngOnInit').and.callFake(() => {
      component.user = {
        _id: '1',
        createdDate: 'date',
        username: 'username',
      }
    });
    expect(component.user).toBeUndefined();
    component.ngOnInit();
    expect(component.user).toBeDefined();
  });

  it('after click on logout button should do log out', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const spy = spyOn(component, 'logout');
    const button = fixture.debugElement.query(By.css('.header__btn_login')).nativeElement;

    button.click();
    fixture.detectChanges();
    expect(spy.calls.count()).toBe(1);
  });
});
