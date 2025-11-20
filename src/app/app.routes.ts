import { Routes  } from '@angular/router';
import { canDeactivateItemViewGuard } from './guards/can-deactivate-item-view-guard';
import { canDeactivateItemGuard } from './guards/can-deactivate-item-guard';
import { ToDoList } from './components/to-do-list/to-do-list';

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
    { path: 'board',
      loadComponent: () => import('./components/board/board').then((c) => c.Board),  
    },
    { path: '**', redirectTo: 'tasks', pathMatch: 'full' },
    
      
        
     
]
