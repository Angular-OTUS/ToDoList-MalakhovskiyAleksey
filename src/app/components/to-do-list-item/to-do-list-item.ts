import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Highlight, TextTitle } from '../../directives';

@Component({
  selector: 'app-to-do-list-item',
  imports: [Highlight,TextTitle],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css'
})
export class ToDoListItem {

  @Input({ required: true }) toDo = {
      id: 0
    , text: ""
    , description : ""
  }
  @Output() deleteItemEvent = new EventEmitter<number>()
  @Output() selectItemEvent = new EventEmitter<number>()

  deleteItemToDo(id: number): void {
    this.deleteItemEvent.emit(id)
  }

  selectItemToDo(id: number): void {
    this.selectItemEvent.emit(id)
  }

}
