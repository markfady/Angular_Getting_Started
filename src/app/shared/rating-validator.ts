import { AbstractControl, ValidatorFn } from "@angular/forms"

export class ratingValidator{
    static range(min:number,max:number):ValidatorFn{ //static so any code can use it without make an instance from the class
        return (c:AbstractControl):{ [key: string] : boolean } |null => { //Custom validator to check value came from (rating) form control.
          if(c.value&&(isNaN(c.value) || c.value<min || c.value>max)){
            return {'range':true} //Validation role name
          }
          return null
      };
    }
}