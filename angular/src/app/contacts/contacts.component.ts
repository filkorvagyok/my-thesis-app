import { NgForm } from '@angular/forms';
import { CompanyService } from './../companies/company.service';
import { MatDialog } from '@angular/material';
import { ProjectService } from './../projects/project.service';
import { Router } from '@angular/router';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Contact } from './contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent extends BaseComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;

  constructor(
    private companyService: CompanyService,
    private projectService: ProjectService,
    private router: Router,
    protected contactService: ContactService,
    protected dialog: MatDialog
  ) {
    super(dialog);
    this.subscription = this.contactService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
    );
    
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        console.log(this.contacts);
      },
      (error: Response) => console.log(error)
    );
    this.contactService.getContact(1).subscribe(
      (contact: Contact) => {
        this.contact = contact;
        console.log(this.contact);
      },
      (error: Response) => console.log(error)
    );
  }

  /*Tölés esetén a céggel összekapcsolt projekt(ek) és névjegy(ek) közül is ki kell törölnünk az adott céget,
	tehát ezzel kezdünk és csak ezután hívjuk meg a companiesApiService delete metódusát*/
	delete(contact: Contact | number): void {
    const actualContact = typeof contact === 'number' ? this.contactService.getItem(contact) : contact;
		if(actualContact.company.length > 0)
			this.companyService.deleteItems(actualContact);
		if(actualContact.project.length > 0)
			this.projectService.deleteItems(actualContact);
		this.contactService.delete(actualContact);
    }
  
    navigateToEdit(): void{
      this.router.navigate(['/people/edit', this.checkedArray[0]]);
    }

    navigateToNewCompany(): void{
      this.router.navigate(['/company/new/', {array: this.checkedArray, num: 2}]);
    }
  
    navigateToNewProject(rank: number): void{
      this.router.navigate(['/project/new/', {array: this.checkedArray, num: 2, rank: rank}]);
    }

  /*A lista nézetben egy név mező kitöltésével tudunk létrehozni
  	egy új céget. A cég további mezőit alaphelyzetbe állítjuk.*/
  	onSubmit(form: NgForm): void{
      let contact = new Contact();
      contact.full_name = form.value.fullname.trim();
      contact.email = form.value.email.trim();
      contact.phone = form.value.phone.trim();
        if (!form.value.fullname || !form.value.email) { return; }
      this.contactService.add(contact);
    }

}
