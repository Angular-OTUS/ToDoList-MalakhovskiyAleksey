import { Component, inject, OnInit, Renderer2 } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ShowIf } from '../../directives'
import { ToDo } from '../../entities/toDo'
import { ToDoListService } from '../../services/to-do-list-service'
import { ToastsComponent } from "../toasts-component/toasts-component"
import { ToastService } from '../../services/toast-service'
import { ToDoStatus } from '../../const/to-do-status'
import { TodoCreateItem } from '../todo-create-item/todo-create-item'
import { concatMap, of } from 'rxjs'

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, ShowIf, ToastsComponent, TodoCreateItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  toDoListService : ToDoListService = inject ( ToDoListService )
  toastService : ToastService = inject ( ToastService )

  curToDoList : ToDo [] = []
  
  newToDo: string = ""
  disabled: boolean = this.newToDo.trim().length == 0
  opacity: number = this.newToDo.trim().length == 0 ? 0.5 : 1.0

  isLoading: boolean = true
  selectedItemId : number | null = null
  
  displayToasts : string = "none"
  curToolTip : string = ""
  fl : string | null = null

  constructor ( private renderer: Renderer2 ) {}
  
  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }

  ngOnInit() {
    setTimeout(() => this.isLoading = false, 500)
    this.toDoListService.getList().subscribe ( toDoList => this.curToDoList = toDoList )
  }

  addToDo( toDo : ToDo ): void {

    this.toDoListService.add ( toDo.text, toDo.description ).pipe(
      concatMap ( newToDo => {
        this.toastService.addMesssage ( "added: " + newToDo.text )
        this.showToast()
        return this.toDoListService.getList()
      })
    ).subscribe ( toDoList => this.curToDoList = toDoList )

  }

  deleteToDo(id: number): void {

    this.toDoListService.remove ( id ).pipe (
      concatMap ( deletedToDo => {
        const placeholders = document.querySelectorAll('#forDeleteID-' + id)
        for ( let i = 0; i < placeholders.length; i++ ) {
          this.renderer.removeChild ( document, placeholders[i] );
        }
        this.toastService.addMesssage ( "deleted: " + deletedToDo.text )
        this.showToast()
        if  ( deletedToDo.id == this.selectedItemId ) {
          this.curToolTip = ""
          this.selectedItemId = 0
        }
        return this.toDoListService.getList()
      })
    ).subscribe ( toDoList => this.curToDoList = toDoList )   
    
  }

  selectToDo(id: number): void {
    this.selectedItemId = id
    this.toDoListService.getList().pipe(
      concatMap ( toDoList =>  {
        let index = toDoList.findIndex(item => item.id === this.selectedItemId)
        return of(toDoList[index].description)
      })
    ).subscribe ( (description : string) => { this.curToolTip = description} )
    
  } 

  public  showToolTip() : boolean {
    return this.selectedItemId != null
  }

  isSelected ( id : number ) : boolean {
    return id == this.selectedItemId
  }

  changeToDo (id: number) : void {

    let index = this.curToDoList.findIndex(item => item.id === id)
    this.toDoListService.update ( this.curToDoList[index] ).pipe (
      concatMap ( updatedToDo => {
        this.toastService.addMesssage ( "changed: " + updatedToDo.text )
        this.showToast()
        return this.toDoListService.getList()
      }) 
    ).subscribe ( toDoList => this.curToDoList = toDoList )

  }

  changeToDoStatus (id: number) : void {
    
    this.toDoListService.read ( id ).pipe ( 
      concatMap ( updatedToDo  => {
        if  ( updatedToDo.status == ToDoStatus.completed )  updatedToDo.status = ToDoStatus.inProgress
        else updatedToDo.status = ToDoStatus.completed
        return this.toDoListService.update ( updatedToDo )
      }),
      concatMap (  updatedToDo => {
        this.toastService.addMesssage ( "changed status: " + updatedToDo.status )
        this.showToast()
        return this.toDoListService.getList()
      })
    ).subscribe ( toDoList => this.curToDoList = toDoList )

    /*
    let changedToDo = this.toDoListService.read ( id )
    if  ( changedToDo.status == ToDoStatus.completed )  changedToDo.status = ToDoStatus.inProgress
    else changedToDo.status = ToDoStatus.completed
    this.toastService.addMesssage ( "changed: " + changedToDo.status )
    this.showToast()
    */
  }

  showToast() : void {
    this.displayToasts = ""
    setTimeout(() => this.displayToasts = 'none', 3000)
  }

  filter ( toDo : ToDo ) : boolean {

    let ret : boolean =  this.fl === null || this.fl === toDo.status.toString()
    
    return ret;
  }
}
