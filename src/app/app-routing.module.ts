import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuicklinkStrategy } from 'ngx-quicklink'
import { AdminGuard } from './guards/admin.guard'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then((w) => w.WebsiteModule),
    data: {
      preload: true
    }
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./website/website.module').then((w) => w.WebsiteModule),
    data: {
      preload: true
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
