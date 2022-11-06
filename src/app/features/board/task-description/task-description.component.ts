import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IComment, IUser, Task } from '../../../types/main';
import { TasksService } from '../../../services/tasks/tasks.service';
import { StoreService } from '../../../services/store/store.service';
import { CommentService } from '../../../services/comment/comment.service';
import { LoadingService } from '../../../services/loading/loading.service';
import { NotificationService } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-task-description',
  templateUrl: './task-description.component.html',
  styleUrls: ['./task-description.component.scss'],
})
export class TaskDescriptionComponent implements OnInit, OnDestroy {
  @Input() card!: Task;
  @Input() boardID!: string;

  @Output() closeCard = new EventEmitter();
  @Output() deleteCard = new EventEmitter();

  sub: Subscription = new Subscription();
  comment = new FormControl('');
  user!: IUser;
  commentList: IComment[] = [];
  loading$: Observable<boolean> = this.loading.loading$;
  isUpdating: boolean = false;

  constructor(
    private loading: LoadingService,
    private commentAPI: CommentService,
    private store: StoreService,
    private taskAPI: TasksService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.store.getUser();
    this.sub.add(this.commentAPI.getComments(this.card?._id)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.commentList = res.comments;
          }
        },
        error: () => {
          this.notificationService.notify('We cannot get your comments');
        }
      }));
  }

  close(): void {
    this.closeCard.emit();
  }

  addCommentByKeyBoard(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.comment.value?.trim() !== '') {
        this.addComment();
      }
    }
  }

  addComment(): void {
    this.sub.add(this.commentAPI.addComment(this.boardID, this.card._id, this.user.username, this.comment.value!)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.commentList.push(res.comment);
            this.comment.setValue('');
          }
        },
        error: () => {
          this.notificationService.notify('We couldn\'t add your comment');
        }
      }));
  }

  deleteComment(cmt: IComment): void {
    this.sub.add(this.commentAPI.deleteComment(cmt._id)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            const index = this.commentList.indexOf(cmt);
            this.commentList.splice(index, 1);
          }
        },
        error: () => {
          this.notificationService.notify('We couldn\'t delete comment');
        }
      }));
  }

  deleteTask(): void {
    this.sub.add(this.taskAPI.deleteTask(this.card._id).subscribe({
        next: () => {
          this.deleteCard.emit(this.card)
        },
        error: (err) => {
          this.notificationService.notify(err.error.message);
        }
      }));
  }

  updateArchive(): void {
    this.isUpdating = true;
    this.sub.add(this.taskAPI.updateArchive(this.card._id, this.card.isArchived)
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.card.isArchived = !this.card.isArchived;
            this.isUpdating = false;
          }
        },
        error: () => {
          this.notificationService.notify('We cannot update task');
          this.isUpdating = false;
        }
      }))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
