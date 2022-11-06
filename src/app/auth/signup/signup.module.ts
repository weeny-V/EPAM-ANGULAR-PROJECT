import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterLink
  ]
})
export class SignupModule { }
