import { Component, input, inject, OnInit, afterNextRender } from '@angular/core';
import { ToDoListService } from '../../services/to-do-list-service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { ToDo } from '../../entities/toDo';

@Component({
  selector: 'app-to-do-item-view',
  imports: [AsyncPipe],
  templateUrl: './to-do-item-view.html',
  styleUrl: './to-do-item-view.css'
})
export class ToDoItemView implements OnInit {

  toDoItemId = input.required<number>()
  toDoListService : ToDoListService = inject ( ToDoListService )

  curToDo : Observable<ToDo> = EMPTY
 
  private readonly route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.curToDo = this.route.params.pipe (
      switchMap ( par => this.toDoListService.read ( par["toDoItemId"] ) )
    )

  }

}
