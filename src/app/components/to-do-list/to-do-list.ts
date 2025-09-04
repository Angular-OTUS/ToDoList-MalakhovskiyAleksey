import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { ToDoListItem } from '../to-do-list-item/to-do-list-item'

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, ToDoListItem],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.css'
})
export class ToDoList implements OnInit {

  toDoList = [
    { id: 1, text: "Buy a new gaming laptop" },
    { id: 2, text: "Complete previos task" },
    { id: 3, text: "Create some angular app" },
  ]

  newToDo: string = ""
  disabled: boolean = this.newToDo.trim().length == 0
  opacity: number = this.newToDo.trim().length == 0 ? 0.5 : 1.0

  isLoading: boolean = true

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
    }
    )

  }

  deleteToDo(id: number): void {
    let index = this.toDoList.findIndex(item => item.id === id)
    this.toDoList.splice(index, 1)
  }
}
