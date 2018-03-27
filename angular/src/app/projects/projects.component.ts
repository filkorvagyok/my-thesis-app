import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { TaskService } from './../tasks/task.service';
import { ContactService } from './../contacts/contact.service';
import { CompanyService } from './../companies/company.service';
import { MatDialog } from '@angular/material';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Project } from './project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent extends BaseComponent implements OnInit {
  projects: Project[];
  project: Project;
  hasDone: Subscription;
  checkedProjectStatus: boolean;

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private taskService: TaskService,
    protected projectService: ProjectService,
    private router: Router,
    protected dialog: MatDialog
  ) {
    super(dialog);
    this.projectService.getEditItems();
    this.subscription = this.projectService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
    );
    this.hasDone = this.projectService.haveDone.subscribe(
      (bool: boolean) => {
        this.checkedProjectStatus = bool;
      }
    );
    }

    ngOnInit() {
    }

    delete(project: Project | number): void {
      const actualProject = typeof project === 'number' ? this.projectService.getItem(project) : project;
      if(actualProject.company.length > 0)
        this.companyService.deleteItems(actualProject);
      if(actualProject.contact.length > 0)
        this.contactService.deleteItems(actualProject);
      this.projectService.delete(actualProject);
  }

    navigateToEdit(): void{
      this.router.navigate(['/project/edit', this.checkedArray[0]]);
    }
  
    createNewContact(): void{
      this.router.navigate(['/people/new/', {array: this.checkedArray, num: 1}]);
    }

    doneProject(): void{
      const status = this.projectService.getStatuses().find(status => status.state === 'Kész');
      this.checkedArray.forEach(
        (id: number) => {
          const project = this.projectService.getItem(id);
          project.status = status;
          this.projectService.update(project);
        }
      )
    }

    /*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	onSubmit(form: NgForm): void{
		let project = new Project();
		project.name = form.value.projectName.trim();
        if (!form.value.projectName) { return; }
    	this.projectService.add(project);
	}

}
