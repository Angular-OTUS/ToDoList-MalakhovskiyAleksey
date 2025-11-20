import { inject, Injectable, OnInit } from '@angular/core';
import { ToDo } from '../entities/toDo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { concatMap, Observable } from 'rxjs';
import { ToDoStatusService } from './to-do-status-service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  toDoStatusService = inject ( ToDoStatusService )

  private  readonly http = inject ( HttpClient )
  
  public toDoList : ToDo[] = []
  
  public  getList () : Observable<ToDo []> {
    return this.http.get<ToDo []>( environment.apiUrl )
  }

  public  read ( id : number ) : Observable<ToDo> {
    return this.http.get<ToDo>( environment.apiUrl + "/" + id )
  }
  public add (
      text : string,
      description : string,
    ) : Observable<ToDo>  {

    return this.getList().pipe (
      concatMap ( (toDoList : ToDo [] ) =>  {
        let maxId : number = 1
        if ( toDoList.length ) {
            maxId = toDoList.reduce((prev, current) =>
              prev.id > current.id ? prev : current
            ).id + 1
        }
        let newToDo = new ToDo ( maxId, text, description, this.toDoStatusService.created() )
        return this.http.post<ToDo> ( environment.apiUrl, newToDo )
      })
    )
      
  }

  public remove ( id : number ) : Observable<ToDo> {
    return this.http.delete<ToDo> ( environment.apiUrl + "/" + id  )
  
  }

  public  update ( toDo : ToDo ) : Observable<ToDo> {
    return this.http.put<ToDo> ( environment.apiUrl + "/" + toDo.id, toDo )
  }

}
