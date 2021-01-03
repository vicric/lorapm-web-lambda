import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesLoranodesComponent } from './expenses-loranodes.component';

describe('ExpensesLoranodesComponent', () => {
  let component: ExpensesLoranodesComponent;
  let fixture: ComponentFixture<ExpensesLoranodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesLoranodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLoranodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
