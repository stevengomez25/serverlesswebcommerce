import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartModalComponent } from './cart-modal';

describe('CartModal', () => {
  let component: CartModalComponent;
  let fixture: ComponentFixture<CartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
