import { Observable, Subscription, take } from 'rxjs';
import {
  Component,
  ElementRef, OnDestroy,
  OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { Board, ISortItem } from '../../types/main';
import { ModalService } from '../../services/modal/modal.service';
import { BoardService } from '../../services/boards/board.service';
import { PromptComponent } from '../../shared/prompt/prompt.component';
import { LoadingService } from '../../services/loading/loading.service';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('view', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  @ViewChild('boardDescription') borderDescription!: ElementRef;

  subscription: Subscription = new Subscription();
  boards: Board[] = [];
  filteredBoards: Board[] = [];
  loading$: Observable<boolean> = this.loading.loading$;
  regex = /\s/g;

  constructor(
    private loading: LoadingService,
    private modalService: ModalService,
    private boardsAPI: BoardService,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
    this.subscription.add(this.boardsAPI
      .getBoards()
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.boards = res.boards;
            this.filteredBoards = res.boards;
          }
        },
        error: () => {
          this.notificationService.notify('We couldn\'t get your boards. Reload this page to try again!');
        }
      }));
  }

  openModal(event: Event, board?: Board): void {
    event.stopPropagation();
    if (board) {
      this.modalService.open(this.entry, ModalWindowComponent, { data: board })
    } else {
      this.modalService.open(this.entry, ModalWindowComponent)
    }
    this.subscription.add(this.modalService.onClose().subscribe((edit) => {
      if (edit && edit.type === 'EDIT') {
        this.subscription.add(this.boardsAPI
          .updateBoard(edit.new._id, edit.new.name)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              if (res.status === 200) {
                const index = this.boards.indexOf(edit.old);

                this.filteredBoards = this.boards.splice(index, 1, edit.new);
              }
            },
            error: () => {
              this.notificationService.notify('We cannot update you board');
            }
          }));
      } else if (edit && edit.type === 'ADD') {
        this.subscription.add(this.boardsAPI
          .addBoard(edit.new.name, edit.new.description)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              if (res.status === 200) {
                this.boards.push(res.board);
              }
            },
            error: () => {
              this.notificationService.notify('We cannot create new board');
            }
          }));
      }
    }));
  }

  openPrompt(event: Event, board: Board): void {
    event.stopPropagation()
    this.modalService.open(this.entry, PromptComponent, {
      data: board.name,
    });
    this.subscription.add(this.modalService
      .onClose()
      .subscribe((isDelete) => {
      if (isDelete) {
        this.subscription.add(this.boardsAPI
          .deleteBoard(board._id)
          .pipe(take(1))
          .subscribe({
            next: (res) => {
              if (res.status === 200) {
                const index = this.filteredBoards.indexOf(board);

                this.filteredBoards = this.boards.splice(index, 1);
                this.notificationService.notify(res.message);
              }
            },
            error: (err) => {
              this.notificationService.notify(err.error.message);
            }
          }));
      }
    }));
  }

  sortByDate(event: ISortItem): void {
    if (event.isAsc) {
      this.filteredBoards = this.boards.sort((a,b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      })
    } else if (event.isDesc) {
      this.filteredBoards = this.boards.sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
    }
  }

  sortByName(event: ISortItem): void {
    if (event.isAsc) {
      this.filteredBoards = this.boards.sort((a,b) => {
        return a.name.localeCompare(b.name);
      })
    } else if (event.isDesc) {
      this.filteredBoards = this.boards.sort((a,b) => {
        return b.name.localeCompare(a.name);
      })
    }
  }

  filtering(value: string): void {
    if(value !== '') {
      this.filteredBoards = this.boards.filter(board => board.name.toLowerCase().includes(value.toLowerCase()));
    } else {
      this.filteredBoards = this.boards;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
