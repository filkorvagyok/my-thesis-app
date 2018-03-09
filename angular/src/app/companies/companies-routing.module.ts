import { AuthGuard } from './../auth/auth-guard.service';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { CompaniesComponent }   from './components/companies/companies.component';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
//import { CompanyCommonComponent } from './components/company-common/company-common.component';

const companyRoutes: Routes = [
  { path: 'company', canActivate: [AuthGuard], children:[
    { path: '', redirectTo: 'list', pathMatch: 'full', },
    { path: 'list', component:CompaniesComponent },
    { path: 'shown/:id', component:CompanyDetailComponent },
    { path: 'edit/:id', component:CompanyEditComponent },
    { path: 'new',  component:CompanyEditComponent },
    { path: 'new/:array[]:num',  component:CompanyEditComponent },
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