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
  newDate: Date = new Date();

  constructor(
    protected companyService: CompanyService,
    protected contactService: ContactService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected dialog: MatDialog,
    public projectService: ProjectService,
    private changeDetector: ChangeDetectorRef
  ) {
    super(route, router, dialog);
  }

  ngOnInit(): void {
    if(this.projectService.getItems() && !this.project){
			this.project = this.projectService.getItem(+this.route.snapshot.params['id']);
    }
  }

	ngAfterViewChecked(): void{
		if(!this.project){
			this.project = this.projectService.getItem(+this.route.snapshot.params['id'])
    }
    else{
      this.project.deadline = new Date(this.project.deadline);
    }
    this.changeDetector.detectChanges();
	}

  navigateToEdit(): void{
		this.router.navigate(['/project/edit', this.project.id]);
  }


  /*Ha van(nak) hozzátartozó cég(ek) vagy névjegy(ek), akkor a saját service-ük segítségével kitöröljük a 
  projektet a megjelenítéshez tárolt több-ből. Ezután ténylegesen elvégezzük a törlést.*/
	delete(project: Project): void{
		if(project.company.length > 0)
      this.companyService.deleteItems(project);
    if(project.contact.length > 0)
			this.contactService.deleteItems(project);
		this.projectService.delete(project);
		this.router.navigate(['project/list']);
	}

	/*Átadjuk a projektet az új névjegy létrehozásához, így
  automatikusan belekerül a névjegy project mezőjébe.*/
  createNewContact(): void{
    let projectsArray: number[] = [];
    projectsArray.push(this.project.id);
    this.router.navigate(['/people/new/', {array:projectsArray, num:1}]);
  }

}
