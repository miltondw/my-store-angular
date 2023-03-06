import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { SmartFormCategoriesComponent } from './containers/smart-form-categories/smart-form-categories.component';
const routes: Routes = [
  {
    path:'',
    component:CategoriesComponent
  },
  {
    path:'create',
    component:SmartFormCategoriesComponent
  },
  {
    path:'edit/:id',
    component:SmartFormCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
