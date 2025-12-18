import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit, QueryList, Renderer2, signal, ViewChildren } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ToDo } from '../../entities/toDo'
import { ToDoListService } from '../../services/to-do-list-service'
import { ToastsComponent } from "../toasts-component/toasts-component"
import { ToastService } from '../../services/toast-service'
import { TodoCreateItem } from '../todo-create-item/todo-create-item'
import { concatMap, Subject, takeUntil, timer } from 'rxjs'
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop'
import { ToDoStatusService } from '../../services/to-do-status-service'
import { ToDoStatus } from '../../entities/to-do-status'
import { AsyncPipe } from '@angular/common'
import { __setFunctionName } from 'tslib'

@Component({
  selector: 'app-to-do-list',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    AsyncPipe,
    FormsModule, ToDoListItem, ToastsComponent, TodoCreateItem

  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ToDoList implements OnInit, OnDestroy {

  private componentIsDestroyed$ = new Subject<boolean>()
  private toDoListService = inject(ToDoListService)
  private toastService = inject(ToastService)
  private destroyRef = inject(DestroyRef)
  private toDoStatusService = inject(ToDoStatusService)

  fl : string = this.toDoListService.fl()
  toDoListData$ = toObservable(this.toDoListService.toDoSignal) 
  
  private newToDo = ""
  private disabled = this.newToDo.trim().length == 0
  private opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0

  isLoading = true

  displayToasts = "none"

  @ViewChildren(ToDoListItem) childComponents!: QueryList<ToDoListItem>;

  private timeoutId: any
  private timer = timer(5000)

  toDoStatusList: ToDoStatus[] = this.toDoStatusService.list()
  reloading: boolean = false

  constructor(private renderer: Renderer2) {}

  onFlChange ( val : string) {
    this.toDoListService.setFilter ( val )
  }

  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }

  ngOnInit() {
    this.timeoutId = setTimeout(() => this.isLoading = false, 500)
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  showToast(): void {
    this.displayToasts = ""
    this.timer.pipe (
      takeUntil(this.componentIsDestroyed$)
    ).subscribe(
      () => this.displayToasts = 'none'
    )
  }

  addToDo(toDo: ToDo): void {

    this.toDoListService.add(toDo.text, toDo.description )
    .subscribe ( toDo => {
        this.toastService.addMesssage("added: " + toDo.text)
        this.showToast()
    })
    
  }

  deleteToDo(id: number): void {

    this.toDoListService.read(id).subscribe ( deletedToDo => {
      this.toDoListService.remove(id)
      const placeholders = document.querySelectorAll('#forDeleteID-' + id)
      for (let i = 0; i < placeholders.length; i++) {
        this.renderer.removeChild(document, placeholders[i]);
      }
      this.toastService.addMesssage("deleted: " + deletedToDo.text)
      this.showToast()
    })

  }

  changeToDo(toDo: ToDo): void {

    this.toDoListService.update(toDo).pipe(
      concatMap(updatedToDo => {
        this.toastService.addMesssage("changed: " + updatedToDo.text)
        this.showToast()
        return this.toDoListData$
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {})

  }

  changeToDoStatus(id: number, statusID: string): void {

    this.toDoListService.read(id).pipe(
      concatMap(updatedToDo => {
        let s = this.toDoStatusService.list().find(status => status.id === statusID)
        if (s != undefined) updatedToDo.status = s

        return this.toDoListService.update(updatedToDo)
      }),
      concatMap(updatedToDo => {
        this.toastService.addMesssage("changed status: " + updatedToDo.status.description)
        this.showToast()
        return this.toDoListData$
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()

  }

  onRouterLinkActive(id: number, event: any) {
    if (!event) {
      this.childComponents.toArray()
        .filter(el => el.getId() === id)
        .forEach(el => el.showItemToDo())
    }
  }

  

}
