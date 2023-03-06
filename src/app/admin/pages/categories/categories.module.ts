import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'

import { CategoriesRoutingModule } from './categories-routing.module';

//Material
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

//Components
import { CategoriesComponent } from './components/categories/categories.component';
import { FormCategoriesComponent } from './components/form-categories/form-categories.component';
import { SmartFormCategoriesComponent } from './containers/smart-form-categories/smart-form-categories.component';
import { SmartCategoriesComponent } from './containers/smart-categories/smart-categories.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    FormCategoriesComponent,
    SmartFormCategoriesComponent,
    SmartCategoriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CategoriesModule { }
