import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter, Inject,
  OnInit,
  Output, ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IModalData } from '../../types/main';
import { MODAL_DATA } from '../../services/modal/modal.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit, AfterViewInit {
  @Output() closeMeEvent = new EventEmitter();

  @ViewChild('boardDescriptionView') boardDescriptionView!: ElementRef;
  @ViewChild('name') name!: ElementRef;

  inputName = new FormControl<string>('');
  isNewItem: boolean = true;

  constructor(
    @Inject(MODAL_DATA) public board: IModalData
  ) { }

  ngOnInit(): void {
    if (this.board.data) {
      this.inputName.setValue(this.board.data.name);
      this.isNewItem = false;
    }
  }

  ngAfterViewInit(): void {
    this.name.nativeElement.focus();
  }

  closeMe(): void {
    this.closeMeEvent.emit();
  }

  addBoard(): void {
    this.closeMeEvent.emit({
      type: 'ADD',
      new: {
        name: this.inputName.value,
        description: this.boardDescriptionView.nativeElement.innerText,
        createdAt: new Date(),
      },
    })
  }

  editBoard(): void {
    this.closeMeEvent.emit({
      type: 'EDIT',
      old: this.board.data,
      new: {
        ...this.board.data,
        name: this.inputName.value,
      }
    });
  }
}
