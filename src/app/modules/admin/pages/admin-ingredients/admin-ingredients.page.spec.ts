import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIngredientsPage } from './admin-ingredients.page';

describe('AdminIngredientsPage', () => {
  let component: AdminIngredientsPage;
  let fixture: ComponentFixture<AdminIngredientsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIngredientsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIngredientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
