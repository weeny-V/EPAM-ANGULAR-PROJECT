import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { INotification } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _subject = new Subject<INotification>();
  private _idx = 0;

  constructor() { }

  getObservable(): Observable<INotification> {
    return this._subject.asObservable();
  }

  notify(message: string, timeout = 3000): void {
    this._subject.next(new INotification(this._idx++, message, timeout));
  }
}
