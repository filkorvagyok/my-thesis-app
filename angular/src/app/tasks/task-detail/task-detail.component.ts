import { ProjectService } from './../../projects/project.service';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../../companies/company.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './../task';
import { TaskService } from './../task.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseDetailComponent } from '../../base/base-detail.component';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent extends BaseDetailComponent implements OnInit, AfterViewChecked {
  task: Task;

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private projectService: ProjectService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected dialog: MatDialog,
    private taskService: TaskService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(route, router, dialog);
  }

  ngOnInit(): void {
    if(this.taskService.getItems() && !this.task){
			this.task = this.taskService.getItem(+this.route.snapshot.params['id'])
		}
  }

	ngAfterViewChecked(){
		if(!this.task){
			this.task = this.taskService.getItem(+this.route.snapshot.params['id'])
    }
    this.changeDetector.detectChanges();
  }

  navigateToEdit(): void{
    this.router.navigate(['/task/edit', this.task.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(task: Task): void {
    if(task.company.length > 0)
			this.companyService.deleteItems(task);
		if(task.contact.length > 0)
			this.contactService.deleteItems(task);
		if(task.project.length > 0)
			this.projectService.deleteItems(task);
    this.taskService.delete(task);
    this.router.navigate(['task/list']);
  }

}
