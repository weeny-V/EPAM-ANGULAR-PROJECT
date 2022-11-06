import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ValidateDirective } from './validate.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ValidateDirective', () => {
  @Component({
    template: `
      <input class='username' name='username' appValidate>
      <input class='password' name='password' appValidate>
    `
  })
  class TestComponent {}
  let fixture: ComponentFixture<TestComponent>;
  let username: HTMLInputElement;
  let password: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ValidateDirective, TestComponent],
    }).createComponent(TestComponent);

    username = fixture.debugElement.queryAll(By.directive(ValidateDirective))[0].nativeElement;
    password = fixture.debugElement.queryAll(By.directive(ValidateDirective))[1].nativeElement;
  })

  it('should create an instance', () => {
    const directive = new ValidateDirective();

    expect(directive).toBeTruthy();
  });

  it('should work correct with username input', () => {
    username.value = '1234';
    username.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(username.style.borderColor).toBe('rgb(156, 163, 175)');
  });

  it('should return red border with length less than 3 for username input', () => {
    username.value = '1';
    username.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(username.style.borderColor).toBe('red');
  });

  it('should return red border with length more than 16 for username input', () => {
    username.value = '12345678912345678';
    username.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(username.style.borderColor).toBe('red');
  });

  it('should return normal border for correct password', () => {
    password.value = 'Test123';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.style.borderColor).toBe('rgb(156, 163, 175)');

  });

  it('should return red border without uppercase letter for password', () => {
    password.value = 'test123';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.style.borderColor).toBe('red');
  });

  it('should return red border without lowercase letter for password', () => {
    password.value = 'TEST123';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.style.borderColor).toBe('red');
  });

  it('should return red border without digit for password', () => {
    password.value = 'Testttt';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.style.borderColor).toBe('red');
  });

  it('should return red border with length less than 6 for password', () => {
    password.value = 'Test1';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.value.length).toBeLessThan(6);
    expect(password.style.borderColor).toBe('red');
  });

  it('should return red border with length more than 20 for password', () => {
    password.value = 'Test12345678912345678';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.value.length).toBeGreaterThan(20);
    expect(password.style.borderColor).toBe('red');
  });
});
