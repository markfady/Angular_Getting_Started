import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';
import { CustomerComponent } from './reactiveForm/customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CustomerComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, //To use Http inside service file , to make get request that returns observable,
    RouterModule.forRoot([
      {path:'welcome',component:WelcomeComponent},
      {path:'ReactiveForm',component:CustomerComponent},
      {path:'',redirectTo:'welcome',pathMatch:'full'}, //when application loads this will be the default view of our application
      {path:'**',redirectTo:'welcome',pathMatch:'full'}
    ]), ProductModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
