import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFormCategoriesComponent } from './smart-form-categories.component';

describe('SmartFormCategoriesComponent', () => {
  let component: SmartFormCategoriesComponent;
  let fixture: ComponentFixture<SmartFormCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartFormCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartFormCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
