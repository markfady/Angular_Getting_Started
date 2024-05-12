import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Customer } from './customer';

function ratingValidator(c:AbstractControl):{ [key: string] : boolean } |null { //Custom validator to check value came from (rating) form control.
    if(c.value!==null &&(isNaN(c.value) || c.value<1 || c.value>5)){
      return {'range':true} //Validation role name
    }
    return null
}

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
      phone:'',
      notification:'email',
      rating:[null,ratingValidator], //Form control name will see (rating)
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
  //use this method to check if text or email is clicked then pass the clicked value inside notifyVia
  setNotification(notifyVia:string):void{
    const phoneControl=this.customerForm.get('phone')
    if(notifyVia==='text'){ //If user selected text , so phone input will be required
      phoneControl?.setValidators(Validators.required) 
    }
    else{
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
  save(){
    console.log(this.customerForm)
    console.log('Saved:' + JSON.stringify(this.customerForm.value))
  }
}
