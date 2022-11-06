import { DndModule } from 'ngx-drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardRoutingModule } from './board-routing.module';
import { TaskComponent } from './task/task.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { SharedModule } from '../../shared/shared.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    BoardComponent,
    TaskComponent,
    TaskBoardComponent,
    TaskDescriptionComponent,
  ],
    imports: [
        CommonModule,
        BoardRoutingModule,
        ReactiveFormsModule,
        DndModule,
        SharedModule,
        DirectivesModule
    ]
})
export class BoardModule { }
