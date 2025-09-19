import { Component, Input, Output, EventEmitter, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { Highlight, TextTitle } from '../../directives';
import { ToDo } from '../../entities/toDo';
import { ToDoListService } from '../../services/to-do-list-service';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule,Highlight,TextTitle],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css'
})
export class ToDoListItem {

  toDoListService : ToDoListService = inject ( ToDoListService )

  @Input({ required: true }) toDo = new ToDo ( 0, "", "" )

  @Output() deleteItemEvent = new EventEmitter<number>()
  @Output() selectItemEvent = new EventEmitter<number>()
  @Output() changedItemEvent = new EventEmitter<number>()

  displayShow : string = ""
  displayChange : string = "none"

  updateToDo : string = ""

  deleteItemToDo(id: number): void {
    this.deleteItemEvent.emit(id)
  }

  selectItemToDo(id: number): void {
    this.selectItemEvent.emit(id)
  }

  changeItemToDo () : void {
    this.displayShow = "none"
    this.displayChange = ""
  }

  saveItemToDo () : void {
    this.displayShow = ""
    this.displayChange = "none" 
    this.changedItemEvent.emit(this.toDo.id)
  }
}
