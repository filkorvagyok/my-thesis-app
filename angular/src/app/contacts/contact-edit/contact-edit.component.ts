import { ProjectService } from './../../projects/project.service';
import { CompanyService } from './../../companies/company.service';
import { Contact } from './../contact';
import { ContactService } from './../contact.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const TEL_REGEX = /^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
	contactForm: FormGroup;
	contact: Contact;
	rank: number;
	companyChanged: boolean = false;
	projectChanged: boolean = false;

  constructor(
		protected companyService: CompanyService,
		protected projectService: ProjectService,
		protected route: ActivatedRoute,
		protected router: Router,
		protected contactService: ContactService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
  ) {
    super(route, router);
  }

  	ngOnInit() {
		this.companyService.getItems();
		this.projectService.getItems();
		this.initform();
		if(this.contactService.getItems() && !this.contact){
			this.setThis();
		}
	}

	ngAfterViewChecked(){
		if(!this.contact){
			this.setThis();
		} else {
			if(this.route.snapshot.params['num']){
				if(this.contact.company.length === 0 && this.companyService.getItems()){
					switch (Number(this.route.snapshot.params['num'])) {
						case 0:
							this.route.snapshot.params['array'].split(",").forEach((x: number) =>{
								const company = this.companyService.getItem(+x);
								this.contact.company.push(company)});
							break;
						case 1:
							this.route.snapshot.params['array'].split(",").forEach((x: number) =>{
								const project = this.projectService.getItem(+x);
								this.contact.project.push(project)});
							break;
						default:
							break;
					}
				}
			}
		}
		this.changeDetector.detectChanges();
  }

  //Form validitás beállítása
	initform(): void{
		this.contactForm = this.fb.group({
			'contactCompany': [],
			'contactProject': [],
			'contactFullName': [null, Validators.required],
			'contactForename': [],
			'contactNickname': [],
			'contactSurename': [],
			'contactMiddlename': [],
			'contactPhone': [null, Validators.pattern(TEL_REGEX)],
			'contactEmail': [null, Validators.pattern(EMAIL_REGEX)],
		});
	}

  setThis(): void{
    if(this.route.snapshot.routeConfig.path == "new")
		{
			//Ha az url "people/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		else
		{
			this.setEdit();
		}
  }

  /*Létrehozunk egy üres contact példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben, akkor
	megnézzük a num értékét is és ha egyenlő 0-val, akkor a tömbben lévő id-kat belerakjuk a company mezőbe,
	ha pedig 1-el egyelnő, akkor pedig a project mezőbe rakjuk az értékeket.*/
	setNew(): void{
		this.contact = new Contact;
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő névjegy adatokat.
	setEdit(): void{
		this.contact = Object.assign({}, this.contactService.getItem(+this.route.snapshot.params['id']));
		this.edit = true;
  }

  compareFn(c1: any, c2: any): boolean {
	return c1 && c2 ? c1.id === c2.id : c1 === c2;
}

asd(event){
	console.log(event)
}

	add(contact: Contact): void{
		this.contactService.add(contact)
		if(contact.company.length > 0){
			this.companyService.modifyItems(contact);
		}
		if(contact.project.length > 0){
			this.projectService.modifyItems(contact);
		}
		this.navigateBack();
  }

  save(): void {
    this.contactService.update(this.contact);
		if(this.companyChanged){
			this.companyService.modifyItems(this.contact);
		}
		if(this.projectChanged){
			this.projectService.modifyItems(this.contact);
		}
		this.navigateBack();
	}

	/*Ha a contact company mezőjében letároltunk 1 vagy több cég id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	cég contact mezőjében ennek a névjegynek az id-ját. Hasonlóan működik, ha
	a contact project mezőjében lárolunk legalább 1 projekt id-t, csak ott a projekt
	megfelő mezőjébe szúrjuk be a contact id-ját.*/

	//Submit lenyomásakor hívódik meg
	onSubmit(contact: Contact){
		if(this.contactForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(contact);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
			$(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
			this.validateAllFormFields(this.contactForm);
		}
	}

}
