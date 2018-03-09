import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//Ezek alapján vizsgálja meg a validitás ellenőrző, hogy az adott mezőbe e-mail írtunk-e.
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
	constructor(private fb: FormBuilder){
		this.resetPassForm = fb.group({
			'resetPassEmail': [null, Validators.compose([Validators.required,
				Validators.pattern(EMAIL_REGEXP)])]
		});
  }

  ngOnInit(){}

	onSubmit(): void{}

}
