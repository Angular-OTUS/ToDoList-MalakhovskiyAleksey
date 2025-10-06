import { Component, Input, Output, EventEmitter, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { Highlight, TextTitle } from '../../directives';
import { ToDo } from '../../entities/toDo';
import { ToDoListService } from '../../services/to-do-list-service';
import { ButtonComponent } from '../../components/button-component/button-component'
import { ToDoStatus } from '../../const/to-do-status';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule,Highlight,TextTitle,ButtonComponent],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css'
})
export class ToDoListItem {

  toDoListService : ToDoListService = inject ( ToDoListService )

  @Input({ required: true }) toDo = new ToDo ( 0, "", "", ToDoStatus.inProgress )

  @Output() deleteItemEvent = new EventEmitter<number>()
  @Output() selectItemEvent = new EventEmitter<number>()
  @Output() changedItemEvent = new EventEmitter<number>()
  @Output() changedItemStatusEvent = new EventEmitter<number>()


  displayShow : string = ""
  displayChange : string = "none"

  updateToDo : string = ""
  completed : ToDoStatus = ToDoStatus.completed

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
    this.selectItemToDo (this.toDo.id)
  }

  changeStatus(id: number)  {
    this.changedItemStatusEvent.emit(id)
  }
}
