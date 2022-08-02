import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthenticationService:AuthenticationService ,private _router:Router ) { }
  logout()
  {
    this._router.navigate(['/signIn'])
   localStorage.clear();
  }
  ngOnInit(): void {
    this._AuthenticationService.isLoggedIn();


  }

}
