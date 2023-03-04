import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormCategoriesComponent } from './components/form-categories/form-categories.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    FormCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
