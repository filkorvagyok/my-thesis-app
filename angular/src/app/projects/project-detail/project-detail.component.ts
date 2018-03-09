import { TaskService } from './../../tasks/task.service';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../../companies/company.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Project } from './../project';
import { ProjectService } from './../project.service';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDetailComponent } from '../../base/base-detail.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends BaseDetailComponent implements OnInit, AfterViewChecked {
  project: Project;

  constructor(
    private companyService: CompanyService,
    private contactService: ContactService,
    private taskService: TaskService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected dialog: MatDialog,
    private projectService: ProjectService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(route, router, dialog);
  }

  ngOnInit(): void {
    if(this.projectService.getItems() && !this.project){
			this.project = this.projectService.getItem(+this.route.snapshot.params['id']);
    }
  }

	ngAfterViewChecked(){
		if(!this.project){
			this.project = this.projectService.getItem(+this.route.snapshot.params['id'])
    }
    this.changeDetector.detectChanges();
	}

  navigateToEdit(): void{
		this.router.navigate(['/project/edit', this.project.id]);
	}


	/*Ha van(nak) hozzátartozó cég(ek) vagy névjegy(ek), akkor először
	  onnan kitöröljük a névjegyet a SharedDeleteDataHandler segítségével, majd
	  a projectsApiService.delete metódusát hajtjuk végre*/
	delete(project: Project): void{
		if(project.company.length > 0)
			this.companyService.deleteItems(project);
    if(project.accountable.length > 0 || project.observer.length > 0 ||
      project.owner.length > 0 || project.participant.length > 0)
			this.contactService.deleteItems(project);
		if(project.task.length > 0)
			this.taskService.deleteItems(project);
		this.projectService.delete(project);
		this.router.navigate(['project/list']);
	}

	/*Átadjuk a projektet az új névjegy létrehozásához.*/
    createNewContact(rank: number): void{
      let projectsArray: number[] = [];
      projectsArray.push(this.project.id);
      this.navigateToNewContact(projectsArray, rank);
    }

    navigateToNewContact(array: number[], rank: number): void{
      this.router.navigate(['/people/new/', {array:array, num:1, rank:rank}]);
    }

    //Lásd.: createNewProject, csak itt névjegy helyett cégre alkalmazzuk
    createNewCompany(): void {
      let projectsArray: number[] = [];
      projectsArray.push(this.project.id);
      this.navigateToNewCompany(projectsArray);
    }

    navigateToNewCompany(array: number[]): void{
      this.router.navigate(['/company/new/', {array:array, num:1}]);
    }

}
