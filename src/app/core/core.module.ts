import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ErrorComponent } from './error/error.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    RouterLinkActive,
    RouterLink,
    RouterModule,
  ],
  providers: [],
})
export class CoreModule { }
