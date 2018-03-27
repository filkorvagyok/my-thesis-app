import { Subscription } from 'rxjs/Subscription';
import { ContactService } from './../../contacts/contact.service';
import { CompanyService } from './../../companies/company.service';
import { Project } from './../project';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from './../project.service';
import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit.component';
import { Company } from '../../companies/company';


const MONEY_REGEX = /^(0|[1-9][0-9]*)$/;

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
	projectForm: FormGroup;
	project: Project;
	companyChanged: boolean = false;
	contactChanged: boolean = false;
	subscription: Subscription;
	companyArray: Company[];

  constructor(
		protected companyService: CompanyService,
		protected contactService: ContactService,
		protected route: ActivatedRoute,
		protected router: Router,
		protected projectService: ProjectService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
	) {
	  super(route, router);
    }

  //Form validitás beállítása
	initform(): void{
		this.projectForm = this.fb.group({
			'projectName': [null, Validators.required],
			'projectIncome': [null, Validators.pattern(MONEY_REGEX)],
			'projectExpenditure': [null, Validators.pattern(MONEY_REGEX)],
			'projectDescription': [],
			'projectChecklist': [],
			'projectFile': [],
			'projectCompany': [],
			'projectStatus': [],
			'projectPriority': [],
			'projectStickers': [],
			'projectCurrency': []
		});
	}

  ngOnInit() {
	this.projectService.getEditItems();
    this.initform();
    if(this.projectService.getItems() && !this.project)
    {
      this.setThis();
    }
  }

	ngAfterViewChecked(){
		if(!this.project){
			this.setThis();
		} else {
			if(this.route.snapshot.params['array']){
				if(this.project.company.length === 0 && this.companyService.getItems()){
					this.route.snapshot.params['array'].split(",").forEach((x: number) =>{
						const company = this.companyService.getItem(+x);
						this.project.company.push(company)});
				}
			}
		}
		this.changeDetector.detectChanges();
	}

  setThis(): void{
		if(this.route.snapshot.routeConfig.path == "new")
		{
			//Ha az url "company/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		else
		{
			this.setEdit();
		}
	}

	setNew(): void{
		this.project = new Project();
	}

	setEdit(): void{
    this.project = this.projectService.getItem(+this.route.snapshot.params['id'])
	this.edit = true;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
  }

  compareFn(c1: any, c2: any): boolean {
	return c1 && c2 ? c1.id === c2.id : c1 === c2;
}

  save(): void{
		console.log("SAVE");
		this.projectService.update(this.project);
		if(this.companyChanged){
			this.companyService.modifyItems(this.project);
		}
    this.navigateBack();
	}

	add(project: Project): void{
		this.projectService.add(project)
		if(project.company.length > 0){
			this.companyService.modifyItems(project);
		}
    	this.navigateBack();
	}

  /*Ha a project company mezőjében letároltunk 1 vagy több cég id-ját,
	akkor ez a metódus a sharedAddDataHandler segítségével rögzíti a megfelelő
	cég project mezőjében ennek a projektnek az id-ját. Hasonlóan működik, ha
	a project accountable, owner,observer vagy participant mezőjében lárolunk
	legalább 1 névjegy id-t, csak ott a névjegy project mezőjébe szúrjuk be a
	project id-ját.*/

	//Dátumválasztó beállítása
	datepickerOpts = {
	    autoclose: true,
	    todayBtn: 'linked',
	    todayHighlight: true,
	    assumeNearbyYear: true,
	    format: 'yyyy. MM d.',
  		showMeridian : false,
  		maxHours: 24,
  		language: 'hu'
	}

	onChange(newValue){
		return newValue;
	}

	//Submit lenyomásakor hívódik meg
	onSubmit(project: Project){
		if(this.projectForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(project);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
			$(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
			this.validateAllFormFields(this.projectForm);
		}
	}

}
