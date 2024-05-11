import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
   
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule, //To use ngModel custom directive inside product-list.component.html
    StarComponent
  ]
})
export class SharedModule { }
