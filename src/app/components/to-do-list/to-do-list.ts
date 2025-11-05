import { Component, DestroyRef, inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ToDo } from '../../entities/toDo'
import { ToDoListService } from '../../services/to-do-list-service'
import { ToastsComponent } from "../toasts-component/toasts-component"
import { ToastService } from '../../services/toast-service'
import { ToDoStatus } from '../../const/to-do-status'
import { TodoCreateItem } from '../todo-create-item/todo-create-item'
import { concatMap, Subject, takeUntil, timer } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-to-do-list',
  imports: [RouterOutlet,RouterLink,RouterLinkActive, FormsModule, ToDoListItem, ToastsComponent, TodoCreateItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<boolean>()
  private toDoListService = inject ( ToDoListService )
  private toastService = inject ( ToastService )
  private destroyRef = inject(DestroyRef)

  curToDoList : ToDo [] = []
  
  private newToDo = ""
  private disabled = this.newToDo.trim().length == 0
  private opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0

  isLoading = true
  
  displayToasts = "none"
  fl : string | null = null

  @ViewChildren(ToDoListItem) childComponents!: QueryList<ToDoListItem>;

  private readonly router = inject(Router)

  private timer = timer ( 5000 ).pipe ( takeUntil(this.componentIsDestroyed$) )
  
  constructor ( private renderer: Renderer2 ) {}
  
  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }

  ngOnInit() {
    setTimeout(() => this.isLoading = false, 500)
    this.toDoListService.getList().subscribe ( toDoList => this.curToDoList = toDoList )
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  addToDo( toDo : ToDo ): void {

    this.toDoListService.add ( toDo.text, toDo.description ).pipe(
      concatMap ( newToDo => {
        this.toastService.addMesssage ( "added: " + newToDo.text )
        this.showToast()
        return this.toDoListService.getList()
      }),
      takeUntilDestroyed ( this.destroyRef )
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
        
        return this.toDoListService.getList()
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe ( (toDoList) => {
      this.router.navigate(["tasks"])
      this.curToDoList = toDoList
     })   
    
  }

  changeToDo (id: number) : void {

    let index = this.curToDoList.findIndex(item => item.id === id)
    this.toDoListService.update ( this.curToDoList[index] ).pipe (
      concatMap ( updatedToDo => {
        this.toastService.addMesssage ( "changed: " + updatedToDo.text )
        this.showToast()
        return this.toDoListService.getList()
      }),
      takeUntilDestroyed(this.destroyRef)
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
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe ( toDoList => this.curToDoList = toDoList )

  }

  onRouterLinkActive (id : number, event: any)  {
    if  ( ! event )  {
      this.childComponents.toArray()
        .filter ( el => el.getId() === id )
        .forEach ( el => el.showItemToDo() )
    }
  }

  showToast() : void {
    this.displayToasts = ""
    this.timer.subscribe ( () => this.displayToasts = 'none' )
  }

  filter ( toDo : ToDo ) : boolean {

    let ret : boolean =  this.fl === null || this.fl === toDo.status.toString()
    
    return ret;
  }
}
