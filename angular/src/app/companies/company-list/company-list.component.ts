import { TaskService } from './../../tasks/task.service';
import { ProjectService } from './../../projects/project.service';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../company.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../company';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { BaseListComponent } from '../../base/base-list.component';

@Component({
	selector: 'app-company-list',
	templateUrl: './company-list.component.html',
	styleUrls: ['./company-list.component.scss']
})

export class CompanyListComponent implements OnInit{

	constructor(
		protected companyService: CompanyService
	){
  }

	ngOnInit(): void{
	}

}
