import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditGuard } from './product-edit.guard';
import { ProductResolver } from './product.resolver.service';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
  
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'products',component:ProductListComponent},
      {path:'products/:id', canActivate:[ProductDetailGuard],component:ProductDetailComponent,resolve:{
        resolvedData:ProductResolver
      }},
      { path: 'products/:id/edit',canDeactivate:[ProductEditGuard],component: ProductEditComponent,resolve:{
        resolvedData:ProductResolver
      }},
    ]), SharedModule
  ]
})
export class ProductModule { }
