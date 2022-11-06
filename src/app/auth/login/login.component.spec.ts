import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test a form group element count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('.login__form');
    const inputElements = formElement.querySelectorAll('.login__field');

    expect(inputElements.length).toEqual(2);
  })

  it('checking initial form values for login form group', () => {
    const loginFormGroup = component.loginForm;
    const loginFormValues = {
      username: '',
      password: '',
    }

    expect(loginFormGroup.value).toEqual(loginFormValues);
  })

  it('check input values before entering some value and validation', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.login__form')
      .querySelectorAll('.login__field')[0];
    const usernameValueFormGroup = component.loginForm.get('username');

    expect(loginFormUserElement.value).toEqual(usernameValueFormGroup?.value);
    expect(usernameValueFormGroup?.errors).not.toBeNull();
    expect(usernameValueFormGroup?.errors!['required']).toBeTruthy();
  })

  it('check username value after entering some value and validation', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.login__form')
      .querySelectorAll('.login__field')[0];

    loginFormUserElement.value = 'username';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        const usernameValueFromGroup = component.loginForm.get('username');

        expect(loginFormUserElement.value).toEqual(usernameValueFromGroup?.value);
        expect(usernameValueFromGroup?.errors).toBeNull();
      })
  })

  it('check whole login form when validations if fulfilled', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.login__form')
      .querySelectorAll('.login__field')[0];
    const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.login__form')
      .querySelectorAll('.login__field')[1];

    loginFormUserElement.value = 'username';
    loginFormPasswordElement.value = '1234567';
    loginFormUserElement.dispatchEvent(new Event('input'));
    loginFormPasswordElement.dispatchEvent(new Event('input'));

    const isLoginFormValid = component.loginForm.valid;

    fixture.whenStable()
      .then(() => {
        expect(isLoginFormValid).toBeTruthy();
      })
  })

  it('submit function should be called once', () => {
    const spy = spyOn(component, 'onSubmit')

    component.onSubmit();
    expect(spy.calls.count()).toBe(1);
  })

  it('submit function should call by button click', () => {
    const spy = spyOn(component, 'onSubmit');
    const form = fixture.debugElement.nativeElement.querySelector('.login__form');

    spy.calls.reset();
    form.dispatchEvent(new Event('submit'));
    expect(spy.calls.count()).toBe(1);
  })

  it('after destroy should return empty subscription', () => {
    const observer1 = new Observable();

    component.sub.add(observer1.subscribe());
    component.ngOnDestroy();
    expect(component.sub['_finalizers']).toBeNull();
  })
});
