import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { TranslocoModule } from "@jsverse/transloco"

import { TextTitle } from '../../directives'
import { ToDo } from '../../entities/toDo';
import { ToDoStatusService } from '../../services/to-do-status-service';

@Component({
  selector: 'app-todo-create-item',
  imports: [TextTitle, FormsModule, TranslocoModule],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.css'
})
export class TodoCreateItem {

  toDoStatusService = inject ( ToDoStatusService )

   @Output() addItemEvent = new EventEmitter<ToDo>()

  newToDo: string = ""
  disabled: boolean = this.newToDo.trim().length == 0
  opacity: number = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  newToolTip : string = ""

  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }
 
  onSubmit(  createToDoItemForm : any ) : void {
    let newToDo = new ToDo (
      0,
      createToDoItemForm.controls['newToDo'].value,
      createToDoItemForm.controls['newToolTip'].value,
      this.toDoStatusService.created()
    )
    this.addItemEvent.emit ( newToDo )
  }
}
