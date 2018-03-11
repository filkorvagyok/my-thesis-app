import { OnInit, AfterViewChecked } from '@angular/core';
import { DeleteDialog } from './../shared/delete-dialog/delete-dialog';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class BaseDetailComponent implements OnInit, AfterViewChecked{
    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected dialog: MatDialog
    ){}

    abstract ngOnInit(): void;

    abstract ngAfterViewChecked(): void;

    navigateBack(): void{
        this.router.navigate(['../../../'], {relativeTo: this.route});
    }

    abstract navigateToEdit(): void;

    /*Megjelenik a DeleteDialog és ha ott megerősítettük a törlést,
  	akkor meghívjuk a törlés funkciót*/
	clickOnDeleteProductButton(item: any): void{
        this.delete(item);
    }
    
    abstract delete(item: any): void;
}