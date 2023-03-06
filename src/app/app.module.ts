import { NgModule } from '@angular/core';
//Imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuicklinkModule } from 'ngx-quicklink'
//Components
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

//Interceptors
import { TimeInterceptor } from './interceptors/time.interceptor'
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProductsComponent } from './app/admin/pages/products/products.component';
import { DashboardComponent } from './app/admin/pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProductsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    QuicklinkModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
