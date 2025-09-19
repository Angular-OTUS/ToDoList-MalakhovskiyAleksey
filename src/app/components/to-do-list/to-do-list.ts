import { Component, inject, OnInit, Renderer2 } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ShowIf, TextTitle } from '../../directives'
import { ToDo } from '../../entities/toDo'
import { ToDoListService } from '../../services/to-do-list-service'
import { ToastsComponent } from "../toasts-component/toasts-component"
import { ToastService } from '../../services/toast-service'

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, ShowIf, TextTitle, ToastsComponent],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  toDoListService : ToDoListService = inject ( ToDoListService )
  toastService : ToastService = inject ( ToastService )

  toDoList : ToDo[] = this.toDoListService.getList()

  newToDo: string = ""
  disabled: boolean = this.newToDo.trim().length == 0
  opacity: number = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  newToolTip : string = ""

  isLoading: boolean = true
  selectedItemId : number | null = null
  
  displayToasts : string = "none"

  constructor ( private renderer: Renderer2 ) {}
  
  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }

  ngOnInit() {

    setTimeout(() => this.isLoading = false, 500)
    this.toDoListService.init()
  }

  addToDo(): void {

    this.toDoListService.add ( this.newToDo, this.newToolTip )
    this.toastService.addMesssage ( "added: " + this.newToDo )
    this.showToast()

  }

  deleteToDo(id: number): void {

    let deletedToDo = this.toDoListService.read ( id )
    this.toDoListService.remove ( id )
    if ( id == this.selectedItemId )  this.selectedItemId = null

    const placeholders = document.querySelectorAll('#forDeleteID-' + id)
    for ( let i = 0; i < placeholders.length; i++ ) {
      this.renderer.removeChild ( document, placeholders[i] );
    }
    this.toastService.addMesssage ( "deleted: " + deletedToDo.text )
    this.showToast()
  }

  selectToDo(id: number): void {
    this.selectedItemId = id
  } 

  public  showToolTip() : boolean {
    return this.selectedItemId != null
  }

  public  toolTip () : string {
    let index = this.toDoList.findIndex(item => item.id === this.selectedItemId)
    return this.toDoList[index].description
  }

  isSelected ( id : number ) : boolean {
    return id == this.selectedItemId
  }

  changeToDo (id: number) : void {
    let changedToDo = this.toDoListService.read ( id )
    this.toastService.addMesssage ( "changed: " + changedToDo.text )
    this.showToast()
  }

  showToast() : void {
    this.displayToasts = ""
    setTimeout(() => this.displayToasts = 'none', 3000)
  }

}
