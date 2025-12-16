import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ToDoStatusService } from '../../services/to-do-status-service';
import { ToDoStatus } from '../../entities/to-do-status';
import { ToDo } from '../../entities/toDo';
import { ToDoListService } from '../../services/to-do-list-service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.html',
  styleUrl: './board.css'
})
export class Board implements OnInit {

  private toDoStatusService = inject(ToDoStatusService)
  private toDoListService = inject(ToDoListService)
  private destroyRef = inject(DestroyRef)
  toDoStatusList: ToDoStatus[] = this.toDoStatusService.list()
  curToDoList: ToDo[] = []
  curToDoMap : Map<string,ToDo[]> = new Map<string,ToDo[]>()

  fl : string = this.toDoListService.fl()
  toDoListData$ = toObservable(this.toDoListService.toDoSignal) 
  
  ngOnInit() {
    this.toDoListService.setFilter ( this.toDoStatusService.all().id )
    this.toDoListData$.pipe (
      takeUntilDestroyed ( this.destroyRef )
    ).subscribe (
      toDoList => {
          this.curToDoList = toDoList
          for ( let i = 0; i < this.toDoStatusList.length; i++ )  {
            this.curToDoMap.set ( this.toDoStatusList[i].id, [] ) 
          }
          for ( let i = 0; i < this.curToDoList.length; i++ )  {
              let list = this.curToDoMap.get(this.curToDoList[i].status.id)
              list?.push ( this.curToDoList[i] )
          }
      }  
    )
  }

  public getToDoQuan ( 
    statusId: string
  ): number {
    let list = this.curToDoMap.get ( statusId )
    if ( list == undefined )  return 0
    return list.length
  }

  public getToDoDescription ( 
    statusId: string,
    i: number
  ): string {

    let list = this.curToDoMap.get ( statusId )
    
    return i < list!.length ? list![i].text : ""
  }
}
