import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormProductsComponent } from './smart-form-products.component';

describe('SmartFormProductsComponent', () => {
  let component: SmartFormProductsComponent;
  let fixture: ComponentFixture<SmartFormProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFormProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartFormProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
