import { ProjectService } from './../../projects/project.service';
import { CompanyService } from './../../companies/company.service';
import { Contact } from './../contact';
import { ContactService } from './../contact.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//reguláris kifejezések:
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
		public companyService: CompanyService,
		public projectService: ProjectService,
		protected route: ActivatedRoute,
		protected router: Router,
		public contactService: ContactService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
  ) {
    super(route, router);
  }

  	ngOnInit(): void{
		this.companyService.getItems();
		this.projectService.getItems();
		this.initform();
		if(this.contactService.getItems() && !this.contact){
			this.setThis();
		}
	}

	ngAfterViewChecked(): void{
		/*Mivel előbb tölt be a view, mint az adatok ezért szükségvel az alábbi metódusra, hogy ne kapjunk hibaüzenetet.*/
		if(!this.contact){
			this.setThis();
		} else {
			/*A router url-ének paraméterei alapján először is megvizsgáljuk a num értékét. Ez alapján, ha 0 az 
			érték akkor az array-ben cég id-k lesznek találhatóak, így a CompanyService segítségével kinyerjük
			a megfelelő cégeket és belerakjuk a névjegy company mezőjébe. Ha az érték 1, akkor pedig az
			array-ben projektek lesznek találhatók, melyek értékeit a ProjectService nyeri ki nekünk és így el
			tudjuk tárolni a névjegy project mezőjében.*/
			if(this.route.snapshot.params['num'] && this.route.snapshot.params['array']){
				if(this.contact.company.length === 0 && this.companyService.getItems()){
					switch (Number(this.route.snapshot.params['num'])) {
						case 0:
							this.route.snapshot.params['array'].split(",").forEach((x: number) =>{
								const company = this.companyService.getItem(+x);
								this.contact.company.push(company);
							});
							break;
						case 1:
							this.route.snapshot.params['array'].split(",").forEach((x: number) =>{
								const project = this.projectService.getItem(+x);
								this.contact.project.push(project)
							});
							break;
						default:
							break;
					}
				}
			}
		}
		this.changeDetector.detectChanges();
	}

	initform(): void{
		/*Létrehozzunk egy formgroupot, amiben az input mezők és a rájuk vonatkozó jogosultsági szabályok találhatók.*/
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
		if(this.route.snapshot.routeConfig.path == "new"){
			//Ha az url "new"-val egyenlő, akkor teljesül
			this.setNew();
		} else {
			//Itt az url minden esetben "edit/:id" lesz és :id helyén, pedig a névjegy id-je.
			this.setEdit();
		}
	}

	setNew(): void{
		this.contact = new Contact;
	}

	setEdit(): void{
		this.contact = Object.assign({}, this.contactService.getItem(+this.route.snapshot.params['id']));
		this.edit = true; //Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
	}

	//Megvizsgál két objektet, hogy azonosak-e.
	compareFn(c1: any, c2: any): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
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

	//Submit lenyomásakor hívódik meg
	onSubmit(contact: Contact){
		if(this.contactForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(contact);  //Ha az edit true, akkor a save hívódik meg, különben az add
	}

}
