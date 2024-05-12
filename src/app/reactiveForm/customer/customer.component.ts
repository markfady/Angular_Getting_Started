import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from './customer';

@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup //defines our form Model (needs to be initialized 'in decleration or constructor or in ngOnInit')
  customer= new Customer(); //defines data passed to and from back-end server

  constructor(private formBuilder:FormBuilder) {
    this.customerForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.maxLength(50)]],
      email: ['',[Validators.required,Validators.email]],
      sendCatalog: true
    })
  }
  
  ngOnInit(){
  }
  populateTestData():void{
    this.customerForm.setValue({
      firstName:'Mark',
      lastName:'Fady',
      email:'mark@giza.com',
      sendCatalog:false
    })
  }
  save(){
    console.log(this.customerForm)
    console.log('Saved:' + JSON.stringify(this.customerForm.value))
  }
}
