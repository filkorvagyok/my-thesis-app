import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactItemComponent } from './contact-list/contact-item/contact-item.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactService } from './contact.service';
import { MatProgressSpinnerModule, MatSelectModule, MatMenuModule,
  MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
//import * as $ from 'jquery';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [
    ContactsComponent,
    ContactListComponent,
    ContactItemComponent,
    ContactDetailComponent,
    ContactEditComponent
  ],
  providers: [ContactService]
})
export class ContactsModule {}