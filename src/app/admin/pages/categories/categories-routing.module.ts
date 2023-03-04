import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { FormCategoriesComponent } from './components/form-categories/form-categories.component';
const routes: Routes = [
  {
    path:'',
    component:CategoriesComponent
  },
  {
    path:'category',
    component:FormCategoriesComponent
  },
  {
    path:'create',
    component:FormCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
