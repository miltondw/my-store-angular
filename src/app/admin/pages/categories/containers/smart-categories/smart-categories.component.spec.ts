import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCategoriesComponent } from './smart-categories.component';

describe('SmartCategoriesComponent', () => {
  let component: SmartCategoriesComponent;
  let fixture: ComponentFixture<SmartCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
