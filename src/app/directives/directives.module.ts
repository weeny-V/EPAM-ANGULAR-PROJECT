import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateDirective } from './validation/validate.directive';
import { AutoHeightDirective } from './autoHeight/auto-height.directive';



@NgModule({
  declarations: [ValidateDirective, AutoHeightDirective],
  imports: [
    CommonModule
  ],
  exports: [ValidateDirective, AutoHeightDirective]
})
export class DirectivesModule { }
