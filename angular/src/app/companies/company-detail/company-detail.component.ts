import { TaskService } from './../../tasks/task.service';
import { ProjectService } from './../../projects/project.service';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../company.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../company';
import { MatDialog } from '@angular/material';
import { BaseDetailComponent } from '../../base/base-detail.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: [ './company-detail.component.scss' ]
})
export class CompanyDetailComponent extends BaseDetailComponent implements OnInit, AfterViewChecked {
  company: Company;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected dialog: MatDialog,
    protected companyService: CompanyService,
    private changeDetector: ChangeDetectorRef,
    protected contactService: ContactService,
    protected projectService: ProjectService,
    private taskService: TaskService
  ) {
    super(route, router, dialog);
  }

  ngOnInit(): void {
    if(this.companyService.getItems() && !this.company){
			this.company = this.companyService.getItem(+this.route.snapshot.params['id']);
		}
  }

	ngAfterViewChecked(){
		if(!this.company){
			this.company = this.companyService.getItem(+this.route.snapshot.params['id']);
    }
    this.changeDetector.detectChanges();
	}

  navigateToEdit(): void{
    this.router.navigate(['/company/edit', this.company.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(company: Company): void {
      if(company.contact.length > 0)
        this.contactService.deleteItems(company);
      if(company.project.length > 0)
        this.projectService.deleteItems(company);
      if(company.task.length > 0)
        this.taskService.deleteItems(company);
      this.companyService.delete(company);
      this.router.navigate(['company/list']);
  }

  /*Átadjuk a céget az új projekt létrehozásához, így
  automatikusan belekerül a projekt company mezőjébe.*/
  createNewProject(): void{
    let companiesArray: number[] = [];
    companiesArray.push(this.company.id);
    this.navigateToNewProject(companiesArray);
  }

  navigateToNewProject(array: number[]): void{
    this.router.navigate(['/project/new/', {array:array, num:0, rank:-1}]);
  }

  //Lásd.: createNewProject, csak itt projekt helyett névjegyre alkalmazzuk
  createNewContact(): void {
    let companiesArray: number[] = [];
    companiesArray.push(this.company.id);
    this.navigateToNewContact(companiesArray);
  }

  navigateToNewContact(array: number[]): void{
    this.router.navigate(['/people/new/', {array:array, num:0, rank:-1}]);
  }
}
