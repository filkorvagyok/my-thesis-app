import { AuthGuard } from './../auth/auth-guard.service';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

const companyRoutes: Routes = [
  { path: 'company', canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'list', pathMatch: 'full', },
    { path: 'list', component:CompaniesComponent },
    { path: 'shown/:id', component:CompanyDetailComponent },
    { path: 'edit/:id', component:CompanyEditComponent },
    { path: 'new',  component:CompanyEditComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(companyRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class CompanyRoutingModule { }