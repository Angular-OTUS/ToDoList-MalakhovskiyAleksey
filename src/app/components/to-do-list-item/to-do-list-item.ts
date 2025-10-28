import { Component, Input, Output, EventEmitter, inject, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { Highlight, TextTitle } from '../../directives';
import { ToDo } from '../../entities/toDo';
import { ToDoListService } from '../../services/to-do-list-service';
import { ButtonComponent } from '../../components/button-component/button-component'
import { ToDoStatus } from '../../const/to-do-status';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';

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
  @Output() changedItemEvent = new EventEmitter<number>()
  @Output() changedItemStatusEvent = new EventEmitter<number>()

  displayShow : string = ""
  displayChange : string = "none"

  completed : ToDoStatus = ToDoStatus.completed

  private readonly router = inject(Router)
  //private readonly routerEvents = toSignal (
  //  this.router.events.pipe (
  //    //filter ( (event) => event instanceof NavigationEnd),
  //    tap ( (event) => console.log("ToDoListItem routerEvent: " + event) )
  //  )
  //)
  
  private readonly route = inject(ActivatedRoute)
  //ivate readonly query = toSignal(
  //this.route.queryParams.pipe( tap((q) => console.log("ToDoListItem queryParams: " + JSON.stringify(q))) )
  //
  //ivate readonly data = toSignal(
  //this.route.data.pipe( tap((q) => console.log("ToDoListItem data: " + JSON.stringify(q))) )
  //
  
  deleteItemToDo(id: number): void {
    this.deleteItemEvent.emit(id)
  }

  showItemToDo ()  {
    this.displayShow = ""
    this.displayChange = "none"
  }

  changeItemToDo () : void {
    this.displayShow = "none"
    this.displayChange = ""
  }

  saveItemToDo () : void {
    this.showItemToDo() 
    this.changedItemEvent.emit(this.toDo.id)
  }

  changeStatus(id: number)  {
    this.changedItemStatusEvent.emit(id)
  }

  getId () : number {
    return this.toDo.id
  }
}
