import { OnInit, AfterViewChecked } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export abstract class BaseEditComponent implements OnInit, AfterViewChecked{
	edit: boolean = false;

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
    ){}

    abstract ngOnInit(): void;

    abstract ngAfterViewChecked(): void;

    abstract initform(): void;

    abstract setThis(): void;

    abstract setEdit(): void;

    abstract setNew(): void;

	navigateBack(): void{
		if(this.edit)
			this.router.navigate(['../../'], {relativeTo: this.route});
		else
			this.router.navigate(['../'], {relativeTo: this.route});
    }

	abstract save(): void;

	abstract add(item: any): void;

	//Úgy állítja a form iput mezőit, mintha belekattintottunk volna
	validateAllFormFields(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
			}
			else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	protected abstract onSubmit(item: any): void;
}