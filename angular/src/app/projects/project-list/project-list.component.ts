import { TaskService } from './../../tasks/task.service';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../../companies/company.service';
import { Project } from './../project';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from '../../base/base-list.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  constructor(
    protected projectService: ProjectService/* ,
		private router: Router,
    protected dialog: MatDialog,
    private companyService: CompanyService,
    private contactService: ContactService,
    private taskService: TaskService */
  ) {
    /* super(dialog);
    this.subscription = this.projectService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		); */
   }

  ngOnInit() {
  }

  getBackgroundColor(project: Project): string{
    if(project.status && project.status.state === 'Kész'){
      return '#eee';
    } else if(project.priority) {
      switch (project.priority.value){
        case 'nagyon fontos':
          return '#ffe6e6';
        case 'fontos':
          return 'lightgoldenrodyellow';
        default:
          return 'none';
      }
    }
  }

  getColor(project: Project): string{
    if(project.status && project.status.state === 'Kész'){
      return '#aaa'
    }
    return 'none';
  }

  /* delete(project: Project | number): void {
		const actualProject = typeof project === 'number' ? this.projectService.getItem(project) : project;
		if(actualProject.company.length > 0)
			this.companyService.deleteItems(actualProject);
    if(actualProject.accountable.length > 0 || actualProject.observer.length > 0 ||
      actualProject.owner.length > 0 || actualProject.participant.length > 0)
			this.contactService.deleteItems(actualProject);
		if(actualProject.task.length > 0)
			this.taskService.deleteItems(actualProject);
		this.projectService.delete(actualProject);
  }

  navigateToEdit(): void{
    this.router.navigate(['/project/edit', this.checkedArray[0]]);
  }

  navigateToNewItem(): void{
    this.router.navigate(["/project/new"]);
  }

  navigateToNewCompany(): void{
    this.router.navigate(['/company/new/', {array: this.checkedArray, num: 1}]);
  }

  navigateToNewContact(rank: number): void{
    this.router.navigate(['/people/new/', {array: this.checkedArray, num: 1, rank: rank}]);
  }

  addInstant(name: string): void{
    let project = new Project();
    project.deadline = new Date(project.deadline);
    project.name = name.trim();
    if (!name) { return; }
    this.projectService.add(project);
  } */
}
