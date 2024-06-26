import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs';
import { ratingValidator } from 'src/app/shared/rating-validator';


//validator for confirm email , email 
  function emailValidator(c:AbstractControl): {[key:string]:boolean} |null{
    const emailControl=c.get('email');
    const confirmEmailControl=c.get('confirmEmail');
    if(emailControl?.value===confirmEmailControl?.value){
      return null;
    }
    return {'match':true} //add this role to form group when both doesn't match 
  }
  interface ValidationMessages {
    [key: string]: string;
  }
    
@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup //defines our form Model (needs to be initialized 'in decleration or constructor or in ngOnInit')
  customer= new Customer(); //defines data passed to and from back-end server
  emailMessage: string = ''; //This will be shown to user as validation message

  get addresses(): FormArray{ //FormArrayName inside HTML 
    return <FormArray> this.customerForm.get('addresses')
  }

  constructor(private formBuilder:FormBuilder) {
    this.customerForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName: ['',[Validators.required,Validators.maxLength(50)]],
      emailGroup:this.formBuilder.group({
        email: ['',[Validators.required,Validators.email]],
        confirmEmail: ['',Validators.required],
      },{validator:emailValidator}),
      phone:'',
      notification:'email',
      rating: ['', [ratingValidator.range(1, 5)]], //Form control name will see (rating)
      sendCatalog: true,
      addresses:this.formBuilder.array([this.buildAddresses()]) //FormArray index 0 = FormGroup of addresses
    })
    //watcher to detect the change in the HTML Text or Email value is chosen by user
    this.customerForm.get('notification')?.valueChanges.subscribe(
      value=> this.setNotification(value)
    )
    //watcher to detect email , re type email  , reactive transformation
      const emailControl=this.customerForm.get('emailGroup.email');
      emailControl?.valueChanges.pipe(
        debounceTime(1000)).subscribe(
          value=>this.setMessage(emailControl)
        )
  }
 
 //Move validation messages from html to class
 private validationMessages: ValidationMessages={
  required:'Please enter valid email',
  email: 'Please enter valid email'
}
  ngOnInit(){}
  //Method to push our formGroup onto the addresses FormArray , called when user want to make any other instances of formGroup
  addAddress():void{
    this.addresses.push(this.buildAddresses())
  }
  buildAddresses():FormGroup{
    return this.formBuilder.group({
      addressType:'home',
      street1:'',
      street2:'',
      city:'',
      state:'',
      zip:'',
    })
  }

  populateTestData():void{
    this.customerForm.setValue({
      firstName:'Mark',
      lastName:'Fady',
      emailGroup:'',
      phone:'01282239598',
      notification:'email',
      rating:5,
      addresses:'cairo',
      sendCatalog:false,

    })
  }
  //Method to check if text or email is clicked then pass the clicked value inside notifyVia
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

//Method to set the emailMessage with different stats(dirty,touched,error)
  setMessage(c: AbstractControl): void {
    this.emailMessage = ''; 
  
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }
  //Method to duplicate the addresses FormGroup when calling it

  save(){
    console.log(this.customerForm)
    console.log('Saved:' + JSON.stringify(this.customerForm.value))
  }
}
