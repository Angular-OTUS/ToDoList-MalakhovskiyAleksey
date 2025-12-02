import { Injectable } from '@angular/core';
import { ToDoStatus } from '../entities/to-do-status';

@Injectable({
  providedIn: 'root'
})
export class ToDoStatusService {
  
  private toDoStatusList : ToDoStatus[] = [
    new ToDoStatus ( "all", "ALL" ),
    new ToDoStatus ( "Created", "created" ),
    new ToDoStatus ( "InProgress", "in progress" ),
    new ToDoStatus ( "Completed", "completed" ),
    new ToDoStatus ( "Rejected", "rejected" ),
  ]

  public list() : ToDoStatus[] {
    return this.toDoStatusList
  }

  public all () : ToDoStatus {
    let index = this.toDoStatusList.findIndex(s => s.id === "all")
    return this.toDoStatusList[index]
  }

  public completed () : ToDoStatus {
    let index = this.toDoStatusList.findIndex(s => s.id === "Completed")
    return this.toDoStatusList[index]
  }

  public created () : ToDoStatus {
    let index = this.toDoStatusList.findIndex(s => s.id === "Created")
    return this.toDoStatusList[index]
  }

  public inProgress () : ToDoStatus {
    let index = this.toDoStatusList.findIndex(s => s.id === "InProgress")
    return this.toDoStatusList[index]
  }

}
