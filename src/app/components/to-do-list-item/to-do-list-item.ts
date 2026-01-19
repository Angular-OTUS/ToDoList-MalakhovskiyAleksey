import { Component, inject, signal, computed, input, output  } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { Highlight, TextTitle } from '../../directives';
import { ToDo } from '../../entities/toDo';
import { ToDoListService } from '../../services/to-do-list-service';
import { ButtonComponent } from '../../components/button-component/button-component'
import { ToDoStatus } from '../../entities/to-do-status';
import { ToDoStatusService } from '../../services/to-do-status-service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-to-do-list-item',
  imports: [FormsModule,Highlight,TextTitle,ButtonComponent,TranslocoModule],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.css'
})
export class ToDoListItem {

  toDoListService   = inject ( ToDoListService )
  toDoStatusService = inject ( ToDoStatusService )

  toDo = input ( new ToDo ( 0, "", "", new ToDoStatus("","") ) )

  deleteItemEvent = output<number>()
  changedItemEvent = output<ToDo>()
  changedItemStatusEvent = output<string>()

  displayShow = signal ( "" )
  displayChange = computed (() => this.displayShow() == "" ? "none" : "")

  toDoStatusList : ToDoStatus[] = this.toDoStatusService.list().filter ( status => status.id != "all" ) 
  completed = this.toDoStatusService.completed()
  
  deleteItemToDo(id: number): void {
    this.deleteItemEvent.emit(id)
  }

  showItemToDo ()  {
    this.displayShow.set ( "" )
  }

  changeItemToDo () : void {
    this.displayShow.set ( "none" )
  }

  saveItemToDo () : void {
    this.showItemToDo() 
    this.changedItemEvent.emit(this.toDo())
  }

  changeStatus()  {
    this.changedItemStatusEvent.emit(this.toDo().status.id)
  }

  getId () : number {
    return this.toDo().id
  }
}
