import { CompanyApiService } from './company.api.service';
import { TaskService } from './../tasks/task.service';
import { ProjectService } from './../projects/project.service';
import { ContactService } from './../contacts/contact.service';
import { MatDialog } from '@angular/material';
import { CompanyService } from './company.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Company, Industry, EmployeesNumber, YearlyIncome, Address, Country } from './company';
import { NgForm } from '@angular/forms';
import { Project } from '../projects/project';
import { Contact } from '../contacts/contact';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent extends BaseComponent implements OnInit{

    constructor(
        private contactService: ContactService,
        private projectService: ProjectService,
        private taskService: TaskService,
        protected companyService: CompanyService,
        private router: Router,
        protected dialog: MatDialog,
        private companyApiService: CompanyApiService
    ){
        super(dialog);
        this.subscription = this.companyService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
        );
    }
    
    ngOnInit(){
    }

    /*Tölés esetén a céggel összekapcsolt projekt(ek) és névjegy(ek) közül is ki kell törölnünk az adott céget,
	tehát ezzel kezdünk és csak ezután hívjuk meg a companiesApiService delete metódusát*/
	delete(company: Company | number): void {
        const actualCompany = typeof company === 'number' ? this.companyService.getItem(company) : company;
		if(actualCompany.contact.length > 0)
			this.contactService.deleteItems(actualCompany);
		if(actualCompany.project.length > 0)
			this.projectService.deleteItems(actualCompany);
		this.companyService.delete(actualCompany);
    }
    
    navigateToEdit(): void{
        this.router.navigate(['/company/edit', this.checkedArray[0]]);
    }

    createNewProject(): void{
        this.router.navigate(['/project/new/', {array: this.checkedArray}]);
    }

    createNewContact(): void{
        this.router.navigate(['/people/new/', {array: this.checkedArray, num: 0}]);
    }

    /*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	onSubmit(form: NgForm): void{
		let company = new Company();
		company.name = form.value.companyName.trim();
        if (!form.value.companyName) { return; }
        this.companyService.add(company);
	}
}
