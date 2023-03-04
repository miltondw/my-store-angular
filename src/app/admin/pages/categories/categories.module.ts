import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
//Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
//Components
import { CategoriesComponent } from './components/categories/categories.component';
import { FormCategoriesComponent } from './components/form-categories/form-categories.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    FormCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CategoriesModule { }
