import { inject, Injectable, signal } from '@angular/core';
import { ToDoStatus } from '../entities/to-do-status';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class ToDoStatusService {
  
  transLocoService = inject ( TranslocoService )

  private toDoStatusList : ToDoStatus[] = [
    new ToDoStatus ( "all", "status.ALL" ),
    new ToDoStatus ( "Created", "status.created" ),
    new ToDoStatus ( "InProgress", "status.inProgress" ),
    new ToDoStatus ( "Completed", "status.completed" ),
    new ToDoStatus ( "Rejected", "status.rejected" ),
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
