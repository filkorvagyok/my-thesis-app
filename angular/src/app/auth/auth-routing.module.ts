import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AnonymousGuard } from './anonymous-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

const authRoutes: Routes = [
    { path: 'login', component:SigninComponent, canActivate: [AnonymousGuard] },
    { path: 'register', component:SignupComponent, canActivate: [AnonymousGuard] },
    { path: 'password/reset', component:ResetPasswordComponent, canActivate: [AnonymousGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule],
  providers: [ AnonymousGuard ]
})
export class AuthRoutingModule {}