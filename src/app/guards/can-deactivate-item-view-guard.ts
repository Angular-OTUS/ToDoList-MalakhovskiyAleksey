import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ToDoItemView } from '../components/to-do-item-view/to-do-item-view';

export const canDeactivateItemViewGuard: CanDeactivateFn<ToDoItemView> = (
  component : ToDoItemView,
  currentRoute : ActivatedRouteSnapshot,
  currentState : RouterStateSnapshot,
  nextState : RouterStateSnapshot
) : Observable<boolean> | boolean  => {
  
  //component.curToDo = EMPTY
  
  return true;
};
