import { Injectable, OnInit } from '@angular/core';
import { ToDo } from '../entities/toDo';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  
  private toDoInitialList : ToDo[] = [
    new ToDo ( 1, "Buy a new gaming laptop",  "tooltip 1" ),
    new ToDo ( 2, "Complete previos task", "tooltip 2" ),
    new ToDo ( 3, "Create some angular app", "tooltip 3" ),
  ]

  public toDoList : ToDo[] = this.toDoInitialList
  
  init(): void {
    this.toDoList = this.toDoInitialList
  }

  public  getList () : ToDo[] {
    return this.toDoList
  }

  public add (
      text : string,
      description : string,
    ) : void  {

    let maxId : number = 1

    if ( this.toDoList.length ) {
      maxId = this.toDoList.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      ).id + 1
    }
    this.toDoList.push ( new ToDo ( maxId, text, description ) )

  }

  public remove ( id : number ) : void {

    let index = this.toDoList.findIndex(item => item.id === id)
    this.toDoList.splice(index, 1)
    
  }

  public  update ( toDo : ToDo )  {

    let index = -1;
    index = this.toDoList.findIndex(item => item.id === toDo.id)
    if ( index > -1 )  {
      this.toDoList[index].text = toDo.text
      this.toDoList[index].description = toDo.description
    }

  }

  public  read ( id : number ) : ToDo {

    let index = this.toDoList.findIndex(item => item.id === id)
    return this.toDoList[index]
    
  }
}
