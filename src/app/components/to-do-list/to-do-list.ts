import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'
import { ShowIf, TextTitle } from '../../directives'

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem, ShowIf, TextTitle],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  toDoList = [
    { id: 1, text: "Buy a new gaming laptop", description : "tooltip 1" },
    { id: 2, text: "Complete previos task", description : "tooltip 2" },
    { id: 3, text: "Create some angular app", description : "tooltip 3" },
  ]

  newToDo: string = ""
  disabled: boolean = this.newToDo.trim().length == 0
  opacity: number = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  newToolTip : string = ""

  isLoading: boolean = true
  selectedItemId : number | null = null
  
  changeValue(): void {
    this.disabled = this.newToDo.trim().length == 0
    this.opacity = this.newToDo.trim().length == 0 ? 0.5 : 1.0
  }

  ngOnInit() {

    setTimeout(() => this.isLoading = false, 500)

  }

  addToDo(): void {

    let maxId = 1

    if (this.toDoList.length) {
      maxId = this.toDoList.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      ).id + 1
    }

    this.toDoList.push({
        id: maxId
      , text: this.newToDo
      , description : this.newToolTip
    }
    )

  }

  deleteToDo(id: number): void {
    let index = this.toDoList.findIndex(item => item.id === id)
    this.toDoList.splice(index, 1)
    if ( id == this.selectedItemId )  this.selectedItemId = null
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
}
