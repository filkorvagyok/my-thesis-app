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

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private taskService: TaskService,
    protected projectService: ProjectService,
    private router: Router,
    protected dialog: MatDialog
  ) {
    super(dialog);
    this.subscription = this.projectService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
    );
    }

    ngOnInit() {
      this.projectService.getProjects().subscribe(
        (projects: Project[]) => {
          this.projects = projects;
          console.log(this.projects);
        },
        (error: Response) => console.log(error)
      );
      this.projectService.getProject(1).subscribe(
        (project: Project) => {
          this.project = project;
          console.log(project);
        }
      );
    }
  
    delete(project: Project | number): void {
      const actualProject = typeof project === 'number' ? this.projectService.getItem(project) : project;
      if(actualProject.company.length > 0)
        this.companyService.deleteItems(actualProject);
      /* if(actualProject.accountable.length > 0 || actualProject.observer.length > 0 ||
        actualProject.owner.length > 0 || actualProject.participant.length > 0)
        this.contactService.deleteItems(actualProject);
      if(actualProject.task.length > 0)
        this.taskService.deleteItems(actualProject); */
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

    /*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	onSubmit(form: NgForm): void{
		let project = new Project();
		project.name = form.value.projectName.trim();
        if (!form.value.projectName) { return; }
    	this.projectService.add(project);
	}

}
