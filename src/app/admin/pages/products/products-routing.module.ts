import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { SmartFormProductsComponent } from './containers/smart-form-products/smart-form-products.component';

const routes: Routes = [
  {
    path:'',
    component:ProductsComponent
  },
  {
    path:'create',
    component:SmartFormProductsComponent
  },
  {
    path:'edit/:id',
    component:SmartFormProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
