import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
})
export class DeleteDialog{
  @Output() clickEvent = new EventEmitter();

  constructor() {}

  onDelete(){
    this.clickEvent.emit();
  }
}