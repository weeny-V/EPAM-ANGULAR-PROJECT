import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { PromptComponent } from './prompt/prompt.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SortPanelComponent } from './sort-panel/sort-panel.component';
import { NotificationComponent } from './notifications/notification.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SortPanelComponent,
    PromptComponent,
    NotificationComponent,
    LoaderComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
  exports: [
    SpinnerComponent,
    SortPanelComponent,
    PromptComponent,
    NotificationComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
