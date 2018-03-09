import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialog } from './../shared/delete-dialog/delete-dialog';

export abstract class BaseListComponent implements OnDestroy{
    checkedArray: number[] = [];
    subscription: Subscription;
    
    constructor(
        protected dialog: MatDialog
    ){}


    abstract navigateToEdit(): void;

    abstract navigateToNewItem(): void;

    clickOnDeleteProductButton(): void{
		let dialogRef = this.dialog.open(DeleteDialog);
		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			if(result===true)
			{
				for (let checkedItem of this.checkedArray) {
					this.delete(checkedItem);
				}
			}
		});
    }
    
    abstract delete(item: any | number): void;

    abstract addInstant(name: string, phone?: string, email?: string): void;

    ngOnDestroy(): void{
		this.subscription.unsubscribe();
	}
}