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
  EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private companyService: CompanyService,
    private projectService: ProjectService,
    private router: Router,
    public contactService: ContactService,
    protected dialog: MatDialog
  ) {
    super(dialog);
    /*A ContactService-ben található checkedArray Subject-re feliratkozva kinyertük az adatait, ez alapján 
    tudjuk mely cégek vannak kijelölve.*/
    this.subscription = this.contactService.checkedArray.subscribe(
			(array: number[]) => this.checkedArray = array
    );
    
  }

  ngOnInit() {
  }

  /*Ha van(nak) hozzátartozó cég(ek) vagy projekt(ek), akkor a saját service-ük segítségével kitöröljük a 
  névjegyet a megjelenítéshez tárolt tömb-ből. Ezután ténylegesen elvégezzük a törlést.*/
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

    /*A lista nézetben a teljes név, e-mail-cím, telefonszám mezők kitöltésével tudunk létrehozni egy új 
    névjegyet. A névjegy további mezőit alaphelyzetbe állítjuk.*/
  	onSubmit(form: NgForm): void{
      let contact = new Contact();
      contact.full_name = form.value.fullname.trim();
      contact.email = form.value.email.trim();
      contact.phone = form.value.phone.trim();
        if (!form.value.fullname || !form.value.email) { return; }
      this.contactService.add(contact);
    }

}
