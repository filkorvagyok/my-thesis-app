import { AuthGuard } from './../auth/auth-guard.service';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const projectRoutes: Routes = [
  { path: 'project', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component:ProjectsComponent },
    { path: 'edit/:id', component:ProjectEditComponent },
    { path: 'new',  component:ProjectEditComponent },
    { path: 'new/:array[]:num:rank',  component:ProjectEditComponent },
    { path: 'shown/:id', component:ProjectDetailComponent }
  ] }
];


@NgModule({
  imports: [
    RouterModule.forChild(projectRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class ProjectRoutingModule { }