import { ProjectService } from './../../projects/project.service';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../../companies/company.service';
import { Task } from './../task';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TaskService } from './../task.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from '../../base/base-list.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends BaseListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(
    private taskService: TaskService,
    private router: Router,
    protected dialog: MatDialog,
    private companyService: CompanyService,
    private contactService: ContactService,
    private projectService: ProjectService
  ) {
    super(dialog);
    this.subscription = this.taskService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		);
  }

  ngOnInit() {
  }

  delete(task: Task | number): void {
		const actualTask = typeof task === 'number' ? this.taskService.getItem(task) : task;
		if(actualTask.company.length > 0)
			this.companyService.deleteItems(actualTask);
		if(actualTask.contact.length > 0)
			this.contactService.deleteItems(actualTask);
		if(actualTask.project.length > 0)
			this.projectService.deleteItems(actualTask);
		this.taskService.delete(actualTask);
  }

  navigateToEdit(): void{
    this.router.navigate(['/task/edit', this.checkedArray[0]]);
  }

  navigateToNewItem(): void{
    this.router.navigate(["/task/new"]);
  }

  navigateToNewProject(){}

  navigateToNewContact(){}

  addInstant(name: string): void{
		let task = new Task();
    task.name = name.trim();
    if (!name) { return; }
    this.taskService.add(task);
  }

  ngOnDestroy(){
		this.subscription.unsubscribe();
	}

}
