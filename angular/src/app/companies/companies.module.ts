import { CompanyApiService } from './company.api.service';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './companies-routing.module';
import { MatSelectModule, MatProgressSpinnerModule, MatMenuModule,
  MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyItemComponent } from './company-list/company-item/company-item.component';
import { CompanyService } from './company.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    SharedModule
  ],
  declarations: [
    CompaniesComponent,
    CompanyDetailComponent,
    CompanyEditComponent,
    CompanyListComponent,
    CompanyItemComponent
  ],
  providers: [CompanyService, CompanyApiService]
})
export class CompaniesModule {}