import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectRoutingModule } from './projects-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { ProjectsComponent } from './projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-list/project-item/project-item.component';
import { MAT_DATE_LOCALE, MatSelectModule, MatMenuModule,
  MatButtonModule, MatCheckboxModule, MatInputModule, MatIconModule } from '@angular/material';
import { ProjectService } from './project.service';
import { NgModule } from '@angular/core';
//import * as $ from 'jquery';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NKDatetimeModule,
  ],
  declarations: [
    ProjectsComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectListComponent,
    ProjectItemComponent
  ],
  providers: [ProjectService, {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}]
})
export class ProjectsModule {}