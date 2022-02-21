import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomePage } from './admin-home.page';

describe('AdminHomePage', () => {
  let component: AdminHomePage;
  let fixture: ComponentFixture<AdminHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
