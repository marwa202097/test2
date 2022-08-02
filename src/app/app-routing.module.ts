import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:"" , redirectTo:"signIn",pathMatch:'full'},
  {path:"signIn" , component:SignInComponent},
  {path:"signUp" , component:SignUpComponent},
  {path:"profile" ,canActivate:[AuthGuard], component:ProfileComponent},
  {path:"**" , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
