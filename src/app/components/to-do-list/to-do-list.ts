import { ApplicationRef, ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core'
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ToDo } from '../../entities/toDo'
import { ToDoListService } from '../../services/to-do-list-service'
import { ToastsComponent } from "../toasts-component/toasts-component"
import { ToastService } from '../../services/toast-service'
import { TodoCreateItem } from '../todo-create-item/todo-create-item'
import { concatMap, map, Subject, takeUntil, timer } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { ToDoStatusService } from '../../services/to-do-status-service'
import { ToDoStatus } from '../../entities/to-do-status'
import { AsyncPipe } from '@angular/common'

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

  fl: string = this.toDoStatusService.all().id
  toDoListData$ = this.toDoListService.getList().pipe(
    map(toDos => toDos.filter(toDo => this.fl === this.toDoStatusService.all().id || this.fl === toDo.status.id))
  )
  appRef = inject(ApplicationRef)
  cdRef = inject(ChangeDetectorRef)
  
  private newToDo = ""
  private disabled = this.newToDo.trim().length == 0
  private opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0

  isLoading = true

  displayToasts = "none"

  @ViewChildren(ToDoListItem) childComponents!: QueryList<ToDoListItem>;

  private readonly router = inject(Router)

  private timer = timer(5000).pipe(takeUntil(this.componentIsDestroyed$))

  toDoStatusList: ToDoStatus[] = this.toDoStatusService.list()
  reloading: boolean = false

  constructor(private renderer: Renderer2) { }

  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }

  ngOnInit() {
    setTimeout(() => this.isLoading = false, 500)
    this.cdRef.markForCheck()
  }

  ngOnDestroy() {
    this.componentIsDestroyed$.next(true);
    this.componentIsDestroyed$.complete();
  }

  addToDo(toDo: ToDo): void {

    this.toDoListService.add(toDo.text, toDo.description).pipe(
      concatMap(newToDo => {
        this.toastService.addMesssage("added: " + newToDo.text)
        this.showToast()
        return this.toDoListData$
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.onChange()
    })

  }

  deleteToDo(id: number): void {

    this.toDoListService.remove(id).pipe(
      concatMap(deletedToDo => {
        const placeholders = document.querySelectorAll('#forDeleteID-' + id)
        for (let i = 0; i < placeholders.length; i++) {
          this.renderer.removeChild(document, placeholders[i]);
        }
        this.toastService.addMesssage("deleted: " + deletedToDo.text)
        this.showToast()

        return this.toDoListData$
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.onChange()
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
    ).subscribe(() => {
      this.cdRef.detectChanges()
    })

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

  showToast(): void {
    this.displayToasts = ""
    this.timer.subscribe(() => this.displayToasts = 'none')
  }

  onChange(): void {
    this.reloading = true
    this.cdRef.detectChanges()
    this.reloading = false
    this.cdRef.detectChanges()
  }
}
