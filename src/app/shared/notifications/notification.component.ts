import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { INotification } from '../../types/main';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: INotification[] = [];
  private _subscription!: Subscription;

  constructor(private _notificationSvc: NotificationService) { }

  private _addNotification(notification: INotification): void {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);

    }
  }

  ngOnInit(): void {
    this._subscription = this._notificationSvc.getObservable().subscribe(notification => this._addNotification(notification));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  close(notification: INotification): void {
    this.notifications = this.notifications.filter(notify => notify.id !== notification.id);
  }
}
