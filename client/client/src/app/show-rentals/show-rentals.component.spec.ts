import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRentalsComponent } from './show-rentals.component';

describe('ShowRentalsComponent', () => {
  let component: ShowRentalsComponent;
  let fixture: ComponentFixture<ShowRentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRentalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
