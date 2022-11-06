import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[AutoHeight]'
})
export class AutoHeightDirective {
  @HostListener('input', ['$event']) autoHeight(event: Event) {
    const element = event.target as HTMLTextAreaElement;

    element.style.height = '5px';
    element.style.height = (element.scrollHeight) + 'px';
  }
}
