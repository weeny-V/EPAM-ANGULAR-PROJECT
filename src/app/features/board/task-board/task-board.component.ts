import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentRef, DoCheck,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Board, DropzoneLayout, Task } from '../../../types/main';
import { DndDropEvent, EffectAllowed } from 'ngx-drag-drop';
import { TasksService } from '../../../services/tasks/tasks.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBoardComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  @Output() onTaskClick = new EventEmitter();
  @Output() onChangeColor = new EventEmitter();

  @ViewChild('view' ,{ read: ViewContainerRef }) view!: ViewContainerRef;

  @Input() title!: String;
  @Input() board!: Board;
  @Input() column: Task[] = [];
  @Input() columnColor: string | undefined;

  sub: Subscription = new Subscription();
  color = new FormControl();
  contentBeforeEdit!: string;
  dragEffect: EffectAllowed = 'move';
  private readonly verticalLayout: DropzoneLayout = {
    container: 'row',
    list: 'column',
    dndHorizontal: false
  };
  layout: DropzoneLayout = this.verticalLayout;
  private currentDraggableEvent?: DragEvent;
  private currentItem?: Task;

  constructor(
    private taskAPI: TasksService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.changeDetector.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.color.value && changes['columnColor'] && changes['columnColor'].currentValue && !changes['columnColor']!.firstChange) {
      this.color.setValue(this.columnColor || '#1f2837');
    }
  }

  onDragStart(event: DragEvent, item: Task): void {
    this.currentDraggableEvent = event;
    this.currentItem = item;
  }

  onDragged(item: Task, list: Task[]): void {
    const index = list.indexOf(item);
    list.splice(index, 1);
  }

  onDragEnd(event: DragEvent): void {
    this.currentDraggableEvent = event;
  }

  onDrop(event: DndDropEvent, list?: Task[]): void {
    let index = event.index;

    if (typeof index === 'undefined') {
      index = list!.length;
    }
    if (event.data.status !== this.title.toUpperCase()) {
      this.sub.add(this.taskAPI.changeStatus(event.data._id, this.title.toUpperCase())
        .subscribe({
          next: (res) => {
            if (res.status === 200) {
              if (typeof index === 'number') {
                event.data.status = this.title.toUpperCase();
                list!.splice(index, 0, event.data);
              }
            }
          },
          error: () => {
            this.notificationService.notify('Something went wrong we cannot replace task');
          }
        }));
    } else {
      list!.splice(index, 0, event.data);
    }
  }

  addTask(): void {
    const componentRef = this.view.createComponent(TaskComponent);
    this.addTaskToDB(componentRef, this.title.toUpperCase(), this.column!);
  }

  addTaskToDB(componentRef: ComponentRef<TaskComponent>, status: string, list: Task[]): void {
    this.sub.add(componentRef.instance.createTask.subscribe((result) => {
      this.sub.add(this.taskAPI.createTask(this.board._id, status, result)
        .subscribe({
          next: (response) => {
            if (response.status === 200) {
              componentRef.destroy();
              list.push(response.newTask);
              this.changeDetector.detectChanges();
            }
          },
          error: () => {
            this.notificationService.notify('Something went wrong and we cannot create task');
          }
        }));
    }));
  }

  onClick(card: Task): void {
    this.onTaskClick.emit(card);
  }

  onEditFinished(event: Event, item: Task): void {
    const target = event.target as HTMLParagraphElement;

    target.contentEditable = 'false';

    if (this.contentBeforeEdit !== target.innerText) {
      this.sub.add(this.taskAPI.editTask(item._id, target.innerText)
        .subscribe({
          next: () => {
          },
          error: () => {
            target.innerText = this.contentBeforeEdit;
            this.notificationService.notify('We couldn\'t update task');
          }
        }));
    }
  }


  onEnter(event: Event): void {
    const target = event.target as HTMLParagraphElement;
    target.blur();
  }


  onEdit(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLSpanElement;
    const task = target.previousSibling as HTMLParagraphElement;
    this.contentBeforeEdit = task.innerText;
    task.contentEditable = 'true';
    task.focus();
  }

  onChange(): void {
    this.onChangeColor.emit(this.color.value);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
