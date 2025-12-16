import { inject, Injectable, signal } from '@angular/core';
import { ToDo } from '../entities/toDo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { concatMap, filter, map, Observable } from 'rxjs';
import { ToDoStatusService } from './to-do-status-service';
import { ToastService } from './toast-service';

type ShowFunction = () => void;

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  toDoStatusService = inject ( ToDoStatusService )
  private toastService = inject(ToastService)
  private  readonly http = inject ( HttpClient )

  public  readonly fl = signal<string>(this.toDoStatusService.all().id)
  private toDoList : ToDo[] = []
  public  readonly toDoSignal = signal ( this.toDoList )

  constructor ()  {
    this.setFilter ( this.fl() )
  }
  
  setFilter ( val : string ) : void {
    this.fl.set ( val )
    this.getList().subscribe ( list => this.toDoSignal.set(list) )
  }

  private  getList () : Observable<ToDo []> {
    return this.http.get<ToDo []>( environment.apiUrl ).pipe (
      map(toDos => toDos.filter(toDo => this.fl() === this.toDoStatusService.all().id || this.fl() === toDo.status.id))
    )
  }

  public  read ( id : number ) : Observable<ToDo> {
    return this.http.get<ToDo>( environment.apiUrl + "/" + id )
  }
  
  
  public add (
      text : string,
      description : string,
      fn : ShowFunction 
    ) : void  {
      this.getList().pipe(
        concatMap ( (toDoList : ToDo [] ) => {
          let maxId : number = 1
          if ( toDoList.length ) {
            maxId = toDoList.reduce((prev, current) =>
              prev.id > current.id ? prev : current
            ).id + 1
          }
          let newToDo = new ToDo ( maxId, text, description, this.toDoStatusService.created() )
          return this.http.post<ToDo []> ( environment.apiUrl, newToDo )
        })
      ).subscribe( () => {
            this.getList().subscribe ( list => this.toDoSignal.set(list) )
            this.toastService.addMesssage("added: " + text)
            fn ()
        })
  }

  public remove ( id : number ) : void {
    this.http.delete<ToDo> ( environment.apiUrl + "/" + id  ).subscribe( () => {this.getList().subscribe ( list => this.toDoSignal.set(list) )} )
  
  }

  public  update ( toDo : ToDo ) : Observable<ToDo> {
    return this.http.put<ToDo> ( environment.apiUrl + "/" + toDo.id, toDo )
  }

  showToast() : void{
    alert ( "showToast")
  }

}
