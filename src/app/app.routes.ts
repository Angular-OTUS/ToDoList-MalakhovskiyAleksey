import { Routes  } from '@angular/router';
import { canDeactivateItemViewGuard } from './guards/can-deactivate-item-view-guard';
import { canDeactivateItemGuard } from './guards/can-deactivate-item-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path:'tasks',
      loadComponent: () => import('./components/to-do-list/to-do-list').then((c) => c.ToDoList),
            
      children : [
        { path : ":toDoItemId",
          loadComponent: () => import('./components/to-do-item-view/to-do-item-view').then((c) => c.ToDoItemView),
          canDeactivate : [ canDeactivateItemViewGuard ],
         }
      ]
      
    },
    { path: '**', redirectTo: 'tasks', pathMatch: 'full' },
    
      
        
     
]
