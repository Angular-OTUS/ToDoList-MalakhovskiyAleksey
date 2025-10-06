import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { TextTitle } from '../../directives'
import { ToDo } from '../../entities/toDo';
import { ToDoStatus } from '../../const/to-do-status';

@Component({
  selector: 'app-todo-create-item',
  imports: [TextTitle, FormsModule],
  templateUrl: './todo-create-item.html',
  styleUrl: './todo-create-item.css'
})
export class TodoCreateItem {

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
    this.addItemEvent.emit ( new ToDo ( 0, createToDoItemForm.controls['newToDo'].value, createToDoItemForm.controls['newToolTip'].value, ToDoStatus.inProgress ) )
  }
}
