import { TaskService } from './../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from './../task';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit.component';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent extends BaseEditComponent implements OnInit, AfterViewChecked {
  task: Task;
	taskForm: FormGroup;


  constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		private taskService: TaskService,
		private fb: FormBuilder,
		private changeDetector: ChangeDetectorRef
  ) {
    super(route, router);
  }

  ngOnInit() {
		this.initform();
		if(this.taskService.getItems() && !this.task){
			this.setThis();
		}
	}

	ngAfterViewChecked(){
		if(!this.task){
			this.setThis();
    }
    this.changeDetector.detectChanges();
  }

  //Form validitás beállítása
	initform(): void{
		this.taskForm = this.fb.group({
			'taskName': [null, Validators.required]
		});
	}

  setThis(): void {
		if(this.route.snapshot.routeConfig.path == "new")
		{
			//Ha az url "project/new"-val egyenlő, akkor teljesül
			this.setNew();
		}
		/*TODO: mivel így nem csak "project/new/:id" esetén hajtja ezt végre,
		ezért ki kell javítani*/
		else
		{
			this.setEdit();
		}
  }

  /*Létrehozunk egy üres project példányt és alaphelyzetbe állítjuk, ha van tömb az url-ben, akkor
	megnézzük a num értékét is és ha egyenlő 0-val, akkor a tömbben lévő id-kat belerakjuk a company mezőbe,
	ha pedig 2-vel egyelnő, akkor pedig a rank értékét is megvizsgáljuk és ezek alapján vagy az accountable,
	vagy az owner, vagy az observer, vagy pedig a participant mezőbe rakjuk a tömb értékeit.*/
	setNew(): void{
    this.task = new Task;
    //majd ide jön olyan kód mint a többinél
	}

	//Az url-ben kapott id alapján lekéri a webapiból a megfelelő projekt adatokat.
	setEdit(): void{
    this.task = this.taskService.getItem(+this.route.snapshot.params['id'])
		this.edit = true;
	}

	save(): void{
		this.taskService.update(this.task)
    this.navigateBack();
	}

	add(task: Task): void{
		this.taskService.add(task)
		this.navigateBack();
	}

	//Submit lenyomásakor hívódik meg
	onSubmit(task: Task){
		if(this.taskForm.valid)  //Ha a validitás megfelelő
			this.edit? this.save() : this.add(task);  //Ha az edit true, akkor a save hívódik meg, különben az add
		else
		{
			$(document.getElementById('maindiv')).animate({ scrollTop: 0 }, 1000); //Felgörger az oldal tetejére
			this.validateAllFormFields(this.taskForm);
		}
	}

}
