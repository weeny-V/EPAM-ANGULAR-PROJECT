import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MODAL_DATA } from '../../services/modal/modal.service';
import { IModalData } from '../../types/main';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();

  constructor(
    @Inject(MODAL_DATA) public name: IModalData,
  ) { }

  ngOnInit(): void { }

  closeMe(): void {
    this.closeMeEvent.emit();
  }

  delete(): void {
    this.closeMeEvent.emit(true);
  }

}
