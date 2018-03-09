import { AuthGuard } from './../auth/auth-guard.service';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent }   from './tasks.component';
import { TaskDetailComponent }   from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';


const taskRoutes: Routes = [
  { path: 'task', canActivate: [AuthGuard], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component:TasksComponent },
    { path: 'edit/:id', component:TaskEditComponent },
    { path: 'new',  component:TaskEditComponent },
    { path: 'shown/:id', component:TaskDetailComponent }
  ] }
];

@NgModule({
  imports: [ RouterModule.forRoot(taskRoutes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class TaskRoutingModule {}