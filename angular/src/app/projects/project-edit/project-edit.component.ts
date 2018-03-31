import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from './../../companies/company.service';
import { Project } from './../project';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
	subscription: Subscription;
	companyArray: Company[];

  constructor(
		public companyService: CompanyService,
		protected route: ActivatedRoute,
		protected router: Router,
		public projectService: ProjectService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
	) {
	  super(route, router);
    }

	initform(): void{
		/*Létrehozzunk egy formgroupot, amiben az input mezők és a rájuk vonatkozó jogosultsági szabályok találhatók.*/
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
			'projectCurrency': []
		});
	}

  ngOnInit(): void{
	this.projectService.getEditItems();
    this.initform();
    if(this.projectService.getItems() && !this.project)
    {
      this.setThis();
    }
  }

	ngAfterViewChecked(): void{
		/*Mivel előbb tölt be a view, mint az adatok ezért szükségvel az alábbi metódusra, hogy ne kapjunk hibaüzenetet.*/
		if(!this.project){
			this.setThis();
		} else {
			/*A router url-ének paraméterei alapján az array-ben cég id-k lesznek találhatóak, így a CompanyService segítségével kinyerjük a megfelelő cégeket és belerakjuk a projekt company mezőjébe.*/
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
		this.project = new Project();
	}

	setEdit(): void{
    this.project = this.projectService.getItem(+this.route.snapshot.params['id'])
		this.edit = true;	//Ezen mező alapján tudja a company-edit.component, hogy szerkeszteni kell vagy új céget létrehozni
	}
	
	/*Amíg nem tudja kinyerni a szükséges dátumot, addig a mai dátumot adja vissza. Nem a legjobb megoldás, de 
	mire betölti az adatokat addigra sikerül is kinyerni a megfelelő dátumot, szóval a felhasználó nem vesz észre 
	belőle semmit*/
	date(){
		if(this.project){
			return new FormControl(this.project.deadline);
		}
		return new FormControl(new Date());
	}

	updateDeadline(event){
		console.log(event);
	}

	//Megvizsgál két objektet, hogy azonosak-e.
	compareFn(c1: any, c2: any): boolean {
		return c1 && c2 ? c1.id === c2.id : c1 === c2;
	}

  save(): void{
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

	//Submit lenyomásakor hívódik meg
	onSubmit(project: Project){
		if(this.projectForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(project);  //Ha az edit true, akkor a save hívódik meg, különben az add
	}

}
