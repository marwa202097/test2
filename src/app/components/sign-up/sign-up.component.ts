import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
declare var $:any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

styleIsValid:any= {'background-color': 'gray' , 'border-color':'gray'};
styleIsInValid:any={'background-color': '#17a2b8' , 'border-color':'#17a2b8'};
isClicked:boolean=false;
isSuccess:boolean=false;
responseMessage:string="";
isUniqueEmailMessage="";
isUniqueEmail=false;

  constructor(private _AuthenticationService:AuthenticationService , private _router:Router) { }


  registerationForm= new FormGroup({
    first_name :new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(12)]),
    last_name :new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(12)]),
    email :new FormControl(null, [Validators.required, Validators.email]),
    age :new FormControl(null, [Validators.required, Validators.min(10),Validators.max(80)]),
    password :new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  })
  signUpData()
  {
    this.isClicked=true;
    if(this.registerationForm.valid)
   {
   console.log(this.registerationForm);
     this._AuthenticationService.signUp(this.registerationForm.value).subscribe({
      next:(response)=>{
        console.log(response)
        if(response.message=='success')
        {
          this._router.navigate(['signIn'])
          this.isClicked=false;
          this.isSuccess=true;
          this.isUniqueEmail=false;
          this.responseMessage= response.message
          this.registerationForm.reset()  //reset form
        }
        else{
          this.isUniqueEmailMessage=response.errors.email.message;
          this.isUniqueEmail=true;
          this.isSuccess=false;
          this.isClicked=false;
        }
        },
       error:(err)=>{console.log(err);
      }

     })
     }
  }

  ngOnInit(): void {
    $('#signUp').particleground();

{

}
  }

}
function particleground(arg0: HTMLElement | null) {
  throw new Error('Function not implemented.');
}

