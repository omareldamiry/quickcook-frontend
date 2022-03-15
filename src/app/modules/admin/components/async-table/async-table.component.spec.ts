import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncTableComponent } from './async-table.component';

describe('AsyncTableComponent', () => {
  let component: AsyncTableComponent;
  let fixture: ComponentFixture<AsyncTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
