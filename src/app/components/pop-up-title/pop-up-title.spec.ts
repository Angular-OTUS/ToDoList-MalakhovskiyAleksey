import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTitle } from './pop-up-title';

describe('PopUpTitle', () => {
  let component: PopUpTitle;
  let fixture: ComponentFixture<PopUpTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
