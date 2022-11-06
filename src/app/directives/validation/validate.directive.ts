import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appValidate]'
})
export class ValidateDirective {

  constructor() { }

  @HostBinding('style.border') border!: string;
  @HostBinding('style.outlineColor') outline!: string;

  @HostListener('input', ['$event']) error(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.name === 'username') {
      if (target.value.length < 3) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else if (target.value.length > 16) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else {
        this.border = '1px solid #9ca3af';
        this.outline = 'black';
      }
    } else if (target.name === 'password') {
      const lowerCase =  /[a-z]/g;
      const upperCase = /[A-Z]/g;
      const digit = /[0-9]/g;

      if (target.value.length < 6) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else if (target.value.length > 20) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else if (!target.value.match(lowerCase)) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else if (!target.value.match(upperCase)) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else if (!target.value.match(digit)) {
        this.border = '2px solid red';
        this.outline = 'red';
      } else {
        this.border = '1px solid #9ca3af';
        this.outline = 'black';
      }
    }
  }

}
