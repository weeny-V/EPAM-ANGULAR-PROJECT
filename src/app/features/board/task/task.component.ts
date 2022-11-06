import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, AfterViewInit {

  @Output() createTask = new EventEmitter();

  @ViewChild('textarea') public textarea!: ElementRef;
  @ViewChild('task') private task!: ElementRef;

  blur: boolean = true;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.textarea.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent): void {
    const element = event.target as HTMLTextAreaElement;
    if (event.key === 'Enter') {
      this.blur = false;
      this.checkValueOfNewTask();
    } else {
      element.style.height = "5px";
      element.style.height = (element.scrollHeight)+"px"
    }
  }

  onBlur(): void {
    if (this.blur) {
      this.checkValueOfNewTask();
    }
  }

  checkValueOfNewTask(): void {
    if (this.textarea.nativeElement.value.trim() === '') {
      this.task.nativeElement.remove();
    } else {
      this.createTask.emit(this.textarea.nativeElement.value);
      this.textarea.nativeElement.remove();
    }
  }
}
