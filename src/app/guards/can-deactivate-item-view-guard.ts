import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { ToDoListItem } from '../components/to-do-list-item/to-do-list-item';
import { Observable } from 'rxjs';
import { ToDoList } from '../components/to-do-list/to-do-list';
import { ToDoItemView } from '../components/to-do-item-view/to-do-item-view';

export const canDeactivateItemViewGuard: CanDeactivateFn<ToDoItemView> = (
  component : ToDoItemView,
  currentRoute : ActivatedRouteSnapshot,
  currentState : RouterStateSnapshot,
  nextState : RouterStateSnapshot
) : Observable<boolean> | boolean  => {
  
  component.description = ""
  
  return true;
};
