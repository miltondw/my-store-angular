import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
// import { CustomPreloadService } from './services/custom-preload.service'
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
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
    // preloadingStrategy: CustomPreloadService
    // preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
