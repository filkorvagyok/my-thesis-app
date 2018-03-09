import { NgForm } from '@angular/forms';
import { DeleteDialog } from './../shared/delete-dialog/delete-dialog';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

export abstract class BaseComponent{
    checkedArray: number[] = [];
    subscription: Subscription;
    
    constructor(
        protected dialog: MatDialog
    ){}

    abstract navigateToEdit(): void;


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
	
	abstract onSubmit(form: NgForm): void;

    ngOnDestroy(): void{
		this.subscription.unsubscribe();
	}
}