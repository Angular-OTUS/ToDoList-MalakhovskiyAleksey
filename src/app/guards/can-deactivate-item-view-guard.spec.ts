import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canDeactivateItemViewGuard } from './can-deactivate-item-view-guard';
import { ToDoItemView } from '../components/to-do-item-view/to-do-item-view';

describe('canDeactivateItemViewGuard', () => {
  const executeGuard: CanDeactivateFn<ToDoItemView> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canDeactivateItemViewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
