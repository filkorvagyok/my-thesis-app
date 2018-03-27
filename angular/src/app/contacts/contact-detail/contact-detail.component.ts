import { TaskService } from './../../tasks/task.service';
import { ProjectService } from './../../projects/project.service';
import { CompanyService } from './../../companies/company.service';
import { ContactService } from './../contact.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact';
import { MatDialog } from '@angular/material';
import { BaseDetailComponent } from '../../base/base-detail.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: [ './contact-detail.component.scss' ]
})
export class ContactDetailComponent extends BaseDetailComponent implements OnInit, AfterViewChecked {
  contact: Contact;

  constructor(
    protected companyService: CompanyService,
    protected projectService: ProjectService,
    private taskService: TaskService,
    protected route: ActivatedRoute,
    protected router: Router,
    protected dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    protected contactService: ContactService
  ) {
    super(route, router, dialog);
  }

  ngOnInit(): void {
    if(this.contactService.getItems() && !this.contact){
			this.contact = this.contactService.getItem(+this.route.snapshot.params['id']);
		}
  }

	ngAfterViewChecked(){
		if(!this.contact){
			this.contact = this.contactService.getItem(+this.route.snapshot.params['id']);
    }
    this.changeDetector.detectChanges();
	}

  navigateToEdit(): void{
    this.router.navigate(['/people/edit', this.contact.id]);
  }

  /*Ha van(nak) hozzátartozó projekt(ek) vagy névjegy(ek), akkor először
  onnan kitöröljük a céget a SharedDeleteDataHandler segítségével, majd
  a companiesApiService.delete metódusát hajtjuk végre*/
  delete(contact: Contact): void {
    if(contact.company.length > 0)
			this.companyService.deleteItems(contact);
		if(contact.project.length > 0)
			this.projectService.deleteItems(contact);
    this.contactService.delete(contact);
    this.router.navigate(['people/list']);
  }

}
