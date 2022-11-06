import { Observable, Subject } from 'rxjs';
import { ComponentRef, Inject, Injectable, InjectionToken, ViewContainerRef } from '@angular/core';
import { ComponentType, ModalConfig } from '../../types/main';
import { ModalWindowComponent } from '../../features/modal-window/modal-window.component';

export const MODAL_DATA = new InjectionToken<string>('');

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private componentRef!: ComponentRef<ModalWindowComponent>;
  private componentSubscriber!: Subject<any>;

  constructor(
    @Inject(MODAL_DATA) private data: any,
  ) {}

  open<T, D = any>(entry: ViewContainerRef, component: ComponentType<any>, config?: ModalConfig<D>): void {
    this.data.data = config?.data;
    this.componentRef = entry.createComponent(component);
    this.componentRef.instance.closeMeEvent.subscribe((value) => this.close(value));
    this.componentSubscriber = new Subject();
  }

  close(value?: any): void {
    this.onClose(value);
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  onClose(value: any = undefined): Observable<any> {
    this.componentSubscriber.next(value);

    return this.componentSubscriber.asObservable();
  }
}
