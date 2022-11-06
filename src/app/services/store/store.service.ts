import { Injectable } from '@angular/core';
import { Subject, scan } from 'rxjs';
import { IStore, IUser } from '../../types/main';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: IStore = {};
  private subject = new Subject();
  private accumulator = this.subject.pipe(
    scan((acc, curr) => Object.assign({}, acc, curr), {})
  );

  subscribe = this.accumulator.subscribe(val => {
    this.store = val;
  })

  setUserInfo(user: IUser): void {
    this.subject.next({ user });
  }

  getUser(): IUser {
    return this.store.user!;
  }
}
