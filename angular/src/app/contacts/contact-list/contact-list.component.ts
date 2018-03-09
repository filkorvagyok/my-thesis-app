import { TaskService } from './../../tasks/task.service';
import { CompanyService } from './../../companies/company.service';
import { ProjectService } from './../../projects/project.service';
import { Contact } from './../contact';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from '../../base/base-list.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent extends BaseListComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private router: Router,
    protected dialog: MatDialog,
    private companyService: CompanyService,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {
    super(dialog);
    this.subscription = this.contactService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
		);
  }

  ngOnInit() {
  }

  delete(contact: Contact | number): void {
    const actualContact = typeof contact === 'number' ? this.contactService.getItem(contact) : contact;
		if(actualContact.company.length > 0)
			this.companyService.deleteItems(actualContact);
		if(actualContact.project.length > 0)
			this.projectService.deleteItems(actualContact);
		if(actualContact.task.length > 0)
			this.taskService.deleteItems(actualContact);
		this.contactService.delete(actualContact);
  }

  navigateToEdit(): void{
    this.router.navigate(['/people/edit', this.checkedArray[0]]);
  }

  navigateToNewItem(): void{
    this.router.navigate(["/people/new"]);
  }

  navigateToNewCompany(): void{
    this.router.navigate(['/company/new/', {array: this.checkedArray, num: 2}]);
  }

  navigateToNewProject(rank: number): void{
    this.router.navigate(['/project/new/', {array: this.checkedArray, num: 2, rank: rank}]);
  }

  addInstant(full_name: string, phone: string, email: string): void{
    let contact = new Contact();
    contact.full_name = full_name.trim();
    contact.phone = phone.trim();
    contact.email = email.trim();
    if (!full_name) { return; }
    this.contactService.add(contact);
  }

}
