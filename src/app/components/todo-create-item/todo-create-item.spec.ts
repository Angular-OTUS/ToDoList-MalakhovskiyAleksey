import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreateItem } from './todo-create-item';

describe('TodoCreateItem', () => {
  let component: TodoCreateItem;
  let fixture: ComponentFixture<TodoCreateItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCreateItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCreateItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
