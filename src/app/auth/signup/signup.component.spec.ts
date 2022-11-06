import { Observable } from 'rxjs';
import { SignupComponent } from './signup.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [ HttpClientTestingModule, FormsModule, ReactiveFormsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test a form group element count', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('.signup__form');
    const inputElements = formElement.querySelectorAll('.signup__field');

    expect(inputElements.length).toEqual(3);
  })

  it('checking initial form values for sign up form group', () => {
    const signupFormGroup = component.signupForm;
    const signupFormValues = {
      username: '',
      password: '',
      confirm: '',
    }

    expect(signupFormGroup.value).toEqual(signupFormValues);
  })

  it('check input values before entering some value and validation', () => {
    const signupFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.signup__form')
      .querySelectorAll('.signup__field')[0];
    const usernameValueFormGroup = component.signupForm.get('username');

    expect(signupFormUserElement.value).toEqual(usernameValueFormGroup?.value);
    expect(usernameValueFormGroup?.errors).not.toBeNull();
    expect(usernameValueFormGroup?.errors!['required']).toBeTruthy();
  })

  it('check username value after entering some value and validation', () => {
    const signupFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.signup__form')
      .querySelectorAll('.signup__field')[0];

    signupFormUserElement.value = 'username';
    signupFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable()
      .then(() => {
        const usernameValueFromGroup = component.signupForm.get('username');

        expect(signupFormUserElement.value).toEqual(usernameValueFromGroup?.value);
        expect(usernameValueFromGroup?.errors).toBeNull();
      })
  })

  it('check whole sign up form when validations if fulfilled', () => {
    const signupFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.signup__form')
      .querySelectorAll('.signup__field')[0];
    const signupFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.signup__form')
      .querySelectorAll('.signup__field')[1];
    const signupFormConfirmElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('.signup__form')
      .querySelectorAll('.signup__field')[2];

    signupFormUserElement.value = 'username';
    signupFormPasswordElement.value = 'Test1234';
    signupFormConfirmElement.value = 'Test1234';
    signupFormUserElement.dispatchEvent(new Event('input'));
    signupFormPasswordElement.dispatchEvent(new Event('input'));
    signupFormConfirmElement.dispatchEvent(new Event('input'));

    const isLoginFormValid = component.signupForm.valid;

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
    const form = fixture.debugElement.nativeElement.querySelector('.signup__form');

    spy.calls.reset();
    form.dispatchEvent(new Event('submit'));
    expect(spy.calls.count()).toBe(1);
  })

  it('checking for password input visibility', () => {
    expect(component.passwordVisibility).toBeFalsy();
    component.changePasswordVisibility('SHOW');
    expect(component.passwordVisibility).toBeTruthy();
    component.changePasswordVisibility('HIDE');
    expect(component.passwordVisibility).toBeFalsy();
  })

  it('checking for confirm input visibility', () => {
    expect(component.confirmVisibility).toBeFalsy()
    component.changeConfirmVisibility('SHOW');
    expect(component.confirmVisibility).toBeTruthy();
    component.changeConfirmVisibility('HIDE');
    expect(component.confirmVisibility).toBeFalsy();
  })

  it('after destroy should return empty subscription', () => {
    const observer1 = new Observable();

    component.sub.add(observer1.subscribe());
    component.ngOnDestroy();
    expect(component.sub['_finalizers']).toBeNull();
  })
});
