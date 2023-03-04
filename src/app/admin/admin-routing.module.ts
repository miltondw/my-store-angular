import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
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
        path: 'grid',
        component: GridComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'form-basic',
        component: BasicFormComponent,
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module')
        .then(c => c.CategoriesModule),
        data: {
          preload: true
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
