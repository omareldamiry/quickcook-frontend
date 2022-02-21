import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientsComponent } from './add-ingredients.component';

describe('AddIngredientsComponent', () => {
  let component: AddIngredientsComponent;
  let fixture: ComponentFixture<AddIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
