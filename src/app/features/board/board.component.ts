import { Observable, Subscription } from 'rxjs';
import {
  Component, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { TaskDescriptionComponent } from './task-description/task-description.component';
import { Board, ISortItem, Task } from '../../types/main';
import { TasksService } from '../../services/tasks/tasks.service';
import { BoardService } from '../../services/boards/board.service';
import { LoadingService } from '../../services/loading/loading.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('viewTodo', { read: ViewContainerRef }) viewTodo!: ViewContainerRef;
  @ViewChild('viewProgress', { read: ViewContainerRef }) viewProgress!: ViewContainerRef;
  @ViewChild('viewDone', { read: ViewContainerRef }) viewDone!: ViewContainerRef;
  @ViewChild('card', { read: ViewContainerRef }) cardView!: ViewContainerRef;

  sub: Subscription = new Subscription();
  board!: Board;
  todo: Task[] = [];
  progress: Task[] = [];
  done: Task[] = [];
  loading$: Observable<boolean> = this.loading.loading$;

  switchColor = {
    'todoColor': (color: string) => {
      this.board.todoColor = color;
    },
    'progressColor': (color: string) => {
      this.board.progressColor = color;
    },
    'doneColor': (color: string) => {
      this.board.doneColor = color;
    }
  };
  deleteTask = {
    'TODO': (card: Task) => {
      const index = this.todo.indexOf(card);
      this.todo.splice(index, 1);
    },
    'IN PROGRESS': (card: Task) => {
      const index = this.progress.indexOf(card);
      this.progress.splice(index, 1);
    },
    'DONE': (card: Task) => {
      const index = this.done.indexOf(card);
      this.done.splice(index, 1);
    }
  };

  constructor(
    private boardAPI: BoardService,
    private loading: LoadingService,
    private router: Router,
    private taskAPI: TasksService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.sub.add(this.boardAPI.getBoardById(this.router.url.split('/')[2])
      .pipe(
        mergeMap((res1) => {
          this.board = res1.board;
          return this.taskAPI.getAllMyTasks(this.board._id)
        }),
      )
      .subscribe({
        next: (res2) => {
          this.todo = res2.tasks.filter(task => task.status === 'TODO');
          this.progress = res2.tasks.filter(task => task.status === 'IN PROGRESS');
          this.done = res2.tasks.filter(task => task.status === 'DONE');
        },
        error: () => {
          this.notificationService.notify('We cannot get you tasks for some reasons');
        }
      }));
  }

  openCard(card: Task): void {
    const cardRef = this.cardView.createComponent(TaskDescriptionComponent);

    cardRef.instance.card = card;
    cardRef.instance.boardID = this.board._id;
    this.sub.add(cardRef.instance.closeCard.subscribe(() => cardRef.destroy()));
    this.sub.add(cardRef.instance.deleteCard.subscribe((card) => {
      this.deleteTask[card.status as keyof typeof this.deleteTask](card);
      cardRef.destroy();
      this.notificationService.notify('Task was successfully deleted');
    }));
  }

  changeColor(color: string, column: string): void {
    this.sub.add(this.boardAPI.changeColor(this.board._id, column, color)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.switchColor[column as keyof typeof this.switchColor](color);
          }
        },
        error: (err) => {
          this.notificationService.notify(err.error.message);
        }
      }));
  }

  sortByDate(event: ISortItem): void {
    if (event.isAsc) {
      this.todo.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      this.progress.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      this.done.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    } else if (event.isDesc) {
      this.todo.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.progress.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      this.done.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }
  }

  sortByName(event: ISortItem): void {
    if (event.isAsc) {
      this.todo.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.progress.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      this.done.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (event.isDesc) {
      this.todo.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      this.progress.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      this.done.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
