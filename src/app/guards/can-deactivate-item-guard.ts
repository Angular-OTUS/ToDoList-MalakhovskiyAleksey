import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { ToDoListItem } from '../components/to-do-list-item/to-do-list-item';

export const canDeactivateItemGuard: CanDeactivateFn<ToDoListItem> = (
  component : ToDoListItem,
  currentRoute : ActivatedRouteSnapshot,
  currentState : RouterStateSnapshot,
  nextState : RouterStateSnapshot
) => {
console.log ( "canDeactivateItemGuard is called" )

  return true;
};
