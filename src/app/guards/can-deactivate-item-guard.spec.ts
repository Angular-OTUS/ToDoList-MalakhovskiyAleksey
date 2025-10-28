import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { canDeactivateItemGuard } from './can-deactivate-item-guard';

describe('canDeactivateItemGuardGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canDeactivateItemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
