import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide: boolean = true;
	loginForm: FormGroup;
	constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ){
		this.loginForm = fb.group({
			'loginEmail': [null, Validators.compose([Validators.required,
				Validators.pattern(EMAIL_REGEXP)])],
			'loginPassword': [null, Validators.required]
		});
  }

  ngOnInit() {
  }

	onSignin(): void{
    this.authService.signin(this.loginForm.controls['loginEmail'].value,
      this.loginForm.controls['loginPassword'].value)
      .subscribe(
        tokenData => console.log(tokenData),
        error => console.log(error)
      );
  }

}
