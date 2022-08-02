import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
declare var $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor( private _AuthenticationService:AuthenticationService , private _router:Router) {
    if(this._AuthenticationService.isLoggedIn())
    {
      this._router.navigate(['/profile'])
    }
  }
  signInForm = new FormGroup({
    email :new FormControl(null, [Validators.required, Validators.email]),
    password :new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])

  })
  signInData()
  {
    if(this.signInForm.valid)
    {console.log(this.signInForm);
      this._AuthenticationService.signIn(this.signInForm.value).subscribe({
        next:(data:any)=>{console.log(data);
          if(data.message=='success')
          {

            localStorage.setItem("token",data.token);
            this._router.navigate(['/profile'])
          }

        },
        error:(err)=>{console.log(err);
        }
      })
    }
  }
  ngOnInit():void {
    $('#signIn').particleground();

  }

}
