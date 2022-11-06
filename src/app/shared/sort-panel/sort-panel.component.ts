import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.scss']
})
export class SortPanelComponent implements OnInit {
  @Input() isDashboard!: boolean;

  @Output() sortByDate = new EventEmitter();
  @Output() sortByName = new EventEmitter();
  @Output() sortByTasks = new EventEmitter();
  @Output() filterByName = new EventEmitter();

  sortBy = new FormControl<string>('Date');
  filterInput = new FormControl<string>('');
  isAsc: boolean = true;
  isDesc: boolean = false;

  emitChooser = {
    'Date': () => {
      this.sortByDate.emit({
        type: 'date',
        isAsc: this.isAsc,
        isDesc: this.isDesc,
      })
    },
    'Tasks': () => {
      this.sortByTasks.emit({
        type: 'task',
        isAsc: this.isAsc,
        isDesc: this.isDesc,
      })
    },
    'Name': () => {
      this.sortByName.emit({
        type: 'name',
        isAsc: this.isAsc,
        isDesc: this.isDesc,
      })
    }
  }

  ngOnInit(): void {
  }

  onChange(): void {
    this.emitChooser[this.sortBy.value as keyof typeof this.emitChooser]();
  }

  sort(): void {
    this.isAsc = !this.isAsc;
    this.isDesc = !this.isDesc;
    this.emitChooser[this.sortBy.value as keyof typeof this.emitChooser]();
  }

  onFilter(): void {
    this.filterByName.emit(this.filterInput.value);
  }
}
