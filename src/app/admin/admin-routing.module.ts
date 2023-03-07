import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/products/products.module')
          .then(c => c.ProductsModule)
      },
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      // },
      {
        path: 'form-basic',
        component: BasicFormComponent,
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module')
          .then(c => c.CategoriesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
