import { AuthGuard } from './../auth/auth-guard.service';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactsComponent } from './contacts.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';


const contactRoutes: Routes = [
  { path: 'people', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component:ContactsComponent },
    { path: 'shown/:id', component:ContactDetailComponent },
    { path: 'edit/:id', component:ContactEditComponent },
    { path: 'new/:array[]:num:rank',  component:ContactEditComponent },
    { path: 'new',  component:ContactEditComponent }
  ]}
];


@NgModule({
  imports: [
    RouterModule.forChild(contactRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})

export class ContactRoutingModule { }