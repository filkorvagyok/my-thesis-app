import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TaskRoutingModule } from './tasks-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule, MatMenuModule, MatButtonModule,
  MatInputModule, MatIconModule } from '@angular/material';
import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskItemComponent } from './task-list/task-item/task-item.component';
import { TaskService } from './task.service';
import { NgModule } from '@angular/core';
//import * as $ from 'jquery';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatIconModule
  ],
  declarations: [
    TasksComponent,
    TaskDetailComponent,
    TaskEditComponent,
    TaskListComponent,
    TaskItemComponent
  ],
  providers: [TaskService]
})
export class TasksModule {}