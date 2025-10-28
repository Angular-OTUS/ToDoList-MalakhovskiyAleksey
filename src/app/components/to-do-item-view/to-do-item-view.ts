import { Component, input, inject, OnInit, effect } from '@angular/core';
import { ToDoListService } from '../../services/to-do-list-service';
import { ActivatedRoute, NavigationEnd, NavigationStart, ResolveStart, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-to-do-item-view',
  imports: [],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.css'
})
export class ToDoItemView implements OnInit {

  toDoItemId = input.required<number>()
  toDoListService : ToDoListService = inject ( ToDoListService )

  description : string = ""
 
  private readonly route = inject(ActivatedRoute)

  private readonly router = inject(Router)
  //private readonly routerEvents = toSignal (
  //  this.router.events.pipe (
  //    //filter ( (event) => event instanceof NavigationEnd),
  //    tap ( (event) => console.log("ToDoItemView routerEvent: " + event) )
  //  )
  //)
  
  private readonly currentNavigation = this.router.getCurrentNavigation
//  readonly #navEffect = effect(() => {
//    console.log('Effect State', this.currentNavigation()?.previousNavigation?.finalUrl);
//  });
  
  constructor ()  {
    // console.log ( "ToDoItemView constructor: currentNavigation = " + this.currentNavigation()?.extras )
  }


  ngOnInit(): void {
    this.route.params.subscribe ( par => {
      // console.log( "ToDoItemView ngOnInit: " + par["toDoItemId"])
      this.toDoListService.read ( par["toDoItemId"] )
        .subscribe ( toDo => toDo == null ? this.description = "" :this.description = toDo.description )
    } )  
  }

}
