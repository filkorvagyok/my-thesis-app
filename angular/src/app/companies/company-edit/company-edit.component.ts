import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { CompanyService } from './../company.service';
import { Company, Country, Address } from './../company';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit.component';

//reguláris kifejezések:
const TEL_REGEX = /^\s*(?:\+?\d{1,3})?[- (]*\d{3}(?:[- )]*\d{3})?[- ]*\d{4}(?: *[x/#]\d+)?\s*$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX = "\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]";
const FACEBOOK_REGEX = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
const SETTLEMENT_REGEX = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
const TAX_REGEX = /^[a-zA-Z0-9_/-]*$/;
const NUMBER_REGEX = /^[0-9]*$/;

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
	companyForm: FormGroup;
	company: Company;
	billing = true;
	mail = true;
	country: Country;
	logo: FormData;


	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		public companyService: CompanyService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
		) {
		super(route, router);
	}

	ngOnInit(): void{
		this.companyService.getEditItems();
		this.initform();
		if(this.companyService.getItems() && !this.company){
			this.setThis();
		}
	}

	ngAfterViewChecked(): void{
		/*Mivel előbb tölt be a view, mint az adatok ezért szükségvel az alábbi metódusra, hogy ne kapjunk hibaüzenetet.*/
		if(!this.company){
			this.setThis();
		}
		this.changeDetector.detectChanges();
	}

	initform(): void{
	/*Létrehozzunk egy formgroupot, amiben az input mezők és a rájuk vonatkozó jogosultsági szabályok találhatók.*/
		this.companyForm = this.fb.group({
		  'companyName': [null, Validators.required],
		  'companyPhone': [null, Validators.pattern(TEL_REGEX)],
		  'companyEmail': [null, Validators.pattern(EMAIL_REGEX)],
		  'companyWebsite': [null, Validators.pattern(URL_REGEX)],
		  'companyFacebook': [null, Validators.pattern(FACEBOOK_REGEX)],
		  'companyHqCountry': [],
		  'companyBiCountry': [],
		  'companyMailCountry': [],
		  'companyHqZipcode':[],
		  'companyBiZipcode':[],
		  'companyMailZipcode':[],
		  'companyHqSettlement': [null, Validators.pattern(SETTLEMENT_REGEX)],
		  'companyBiSettlement': [null, Validators.pattern(SETTLEMENT_REGEX)],
		  'companyMailSettlement': [null, Validators.pattern(SETTLEMENT_REGEX)],
		  'companyHqAddress': [],
		  'companyBiAddress': [],
		  'companyMailAddress': [],
		  'companyTaxnumber': [null, Validators.pattern(TAX_REGEX)],
		  'companyIndustry': [],
		  'companyEmployeesnum': [],
		  'companyYearlyincome': [],
		  'companyFounded': [null, Validators.compose(
			[Validators.min(578), Validators.max(Number(new Date().getFullYear())),
			Validators.pattern(NUMBER_REGEX)]
		  )],
		});
	}

	setThis(): void{
		if(this.route.snapshot.routeConfig.path == "new")
		{
			//Ha az url "new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		else
		{
			//Itt az url minden esetben "edit/:id" lesz és :id helyén, pedig a cég id-je.
			this.setEdit();
		}
	}

	setNew(): void{
		this.company = new Company();
	}

	setEdit(): void{
		this.company = this.companyService.getItem(+this.route.snapshot.params['id'])
		this.edit = true; //Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
		if(this.company){
			const bill = this.company.billing;
			const ma = this.company.mailing;
			//Megvizsgáljuk, hogy vannak-e számlázáshoz vagy levelezéshez megadva külön adatok a cégben.
			if(bill.country.id || bill.zipcode || bill.settlement || bill.address_line)
				this.billing = false;
			if(ma.country.id || ma.zipcode || ma.settlement || ma.address_line)
				this.mail = false;
		}
	}

	//Megvizsgál két objektet, hogy azonosak-e.
	compareFn(c1: any, c2: any): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	/*Ha a felhasználó 'A számlázási adatok azonosak' vagy 'A levelezési adatok azonosak' checkboxot kipipálja,
	akkor az alábbi kód fut le, amelyik kitörli az összes eddig tárolt mezőt a címből.*/
	sameAsHeadquarter(address: Address){
		address.country.id = null;
		address.country.code = null;
		address.country.name = null;
		address.zipcode = null;
		address.settlement = null;
		address.address_line = null;
		return address;
	}

	onFileSelected(event){
		const fd = new FormData();
		const selectedFile = <File>event.target.files[0];
		fd.append('logo', selectedFile, this.company.name);
		return event;
	}

	save(): void {
		this.companyService.update(this.company)
		this.navigateBack();
	}

	add(company: Company): void{
		console.log(company);
		company.logo = undefined;
		if(this.logo)
			this.companyService.addLogo(this.logo);
		this.companyService.add(company)
		this.navigateBack();
	}

	//Submit lenyomásakor hívódik meg
	onSubmit(company: Company){
		if(this.companyForm.valid)  //Ha a validitás megfelelő
		  this.edit? this.save() : this.add(company);  //Ha az edit true, akkor a save hívódik meg, különben az add
	}
}
