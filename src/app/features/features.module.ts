import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dasboard/dashboard.component';
import { DndModule } from 'ngx-drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ModalWindowComponent,
  ],
  imports: [
    CommonModule,
    DndModule,
    ReactiveFormsModule,
    RouterLink,
    SharedModule,
    DirectivesModule,
  ],
  exports: [
    DashboardComponent,
    ModalWindowComponent,
  ]
})
export class FeaturesModule {
}
