import { TestBed } from '@angular/core/testing';

import { ToDoStatusService } from './to-do-status-service';

describe('ToDoStatusService', () => {
  let service: ToDoStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
