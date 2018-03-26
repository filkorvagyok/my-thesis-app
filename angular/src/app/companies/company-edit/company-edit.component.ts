import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { CompanyService } from './../company.service';
import { Company, Country, Address } from './../company';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit.component';

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


	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		protected companyService: CompanyService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
		) {
		super(route, router);
	}

	onValueCahnged(country: Country, event){
		country = this.companyService.countries.find(x => x.id === event.value);
		return country;
	}

	ngOnInit() {
		this.companyService.getEditItems();
		this.initform();
		if(this.companyService.getItems() && !this.company){
			this.setThis();
		}
	}

	ngAfterViewChecked(){
		if(!this.company){
			this.setThis();
		}
		this.changeDetector.detectChanges();
	}

	//Form validitás beállítása
	initform(): void{
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
			//Ha az url "company/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "company/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
		}
	}

	setNew(): void{
		this.company = new Company();
		/* switch (Number(this.route.snapshot.params['num'])) {
			case 1:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.company.project.push(Number(x)));
				break;
			case 2:
				this.route.snapshot.params['array'].split(",").forEach(x =>
					this.company.contact.push(Number(x)));
				break;
			default:
				break;
		} */
	}

	setEdit(): void{
		this.company = this.companyService.getItem(+this.route.snapshot.params['id'])
		this.edit = true;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
		if(this.company){
			const bill = this.company.billing;
			const ma = this.company.mailing;
			if(bill.country.id || bill.zipcode || bill.settlement || bill.address_line)
				this.billing = false;
			if(ma.country.id || ma.zipcode || ma.settlement || ma.address_line)
				this.mail = false;
		}
	}

	compareFn(c1: any, c2: any): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

	sameAsHeadquarter(address: Address){
		address.country.id = null;
		address.country.code = null;
		address.country.name = null;
		address.zipcode = null;
		address.settlement = null;
		address.address_line = null;
		return address;
	}

	//TODO: átszervezni az összes országokkal kapcsolatos mezőket.
	//CHANGE THIS
	/* onChangeHqcountry(newValue){
		const actualCountry: Country = this.countries.find((country: Country)=>country.code==newValue); */
		/* if(actualCountry)
		  this.company.hq_country = actualCountry.country; */
		/* return newValue;
	} */

	save(): void {
		this.companyService.update(this.company)
		this.navigateBack();
	}

	/*Ha a company project mezőjében letároltunk 1 vagy több projekt id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	projekt company mezőjében ennek a cégnek az id-ját.*/
	add(company: Company): void{
		/* this.company.headquarter.country = this.companyService.countries.find(x => x.id === company.headquarter.country.id); */
		this.companyService.add(company)
		this.navigateBack();
	}

	/*Ha be van pipálva, hogy a számlázási adatok azonosak,
	akkor hajtódik végre és lemásolja a székhely adatokat*/
	//DELETE THIS
	billing_datas(company: Company): void{
		/* this.company.bi_address = company.hq_address;
		this.company.bi_country = company.hq_country;
		this.company.bi_name = company.name;
		this.company.bi_settlement = company.hq_settlement;
		this.company.bi_zipcode = company.hq_zipcode; */
	}

	/*Ha be van pipálva, hogy a levelezési adatok azonosak,
	akkor hajtódik végre és lemásolja a székhely adatokat*/
	//DELETE THIS
	mail_datas(company: Company): void{
		/* this.company.mail_address = company.hq_address;
		this.company.mail_country = company.hq_country;
		this.company.mail_name = company.name;
		this.company.mail_settlement = company.hq_settlement;
		this.company.mail_zipcode = company.hq_zipcode; */
	}


	//Submit lenyomásakor hívódik meg
	onSubmit(company: Company){
		if(this.companyForm.valid)  //Ha a validitás megfelelő
		  this.edit? this.save() : this.add(company);  //Ha az edit true, akkor a save hívódik meg, különben az add
		/* else
		{
			this.validateAllFormFields(this.companyForm);
			let target: AbstractControl;
			for(var i in this.companyForm.controls)
			{
				if(!this.companyForm.controls[i].valid){
					target = this.companyForm.controls[i];
					break;
				}
			}
			console.log(target);
			if(target)
				$('html,body').animate({scrollTop: $(target).offset().top}, 'slow'); //Felgörger az oldal tetejére
		} */
	}
}
