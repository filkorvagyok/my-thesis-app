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
  error: string = '';
  hide: boolean = true;
	loginForm: FormGroup;
	constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ){
    //Létrehozzunk egy formgroupot, amiben az input mezők és a rájuk vonatkozó jogosultsági szabályok találhatók.
		this.loginForm = fb.group({
			'loginEmail': [null, Validators.compose([Validators.required,
				Validators.pattern(EMAIL_REGEXP)])],
			'loginPassword': [null, Validators.required]
		});
  }

  ngOnInit(): void{
  }

  /*Az authservice signin függvényének átadjuk az inputmezők adatait majd, sikeres bejelentkezés esetén
   console-ba kiírjuk a token adatait, sikertelen bejelentkezés esetén pedig jelezzük a felhasználónak, hogy
    hibás adatokat adott meg.*/
	onSignin(): void{
    this.authService.signin(this.loginForm.controls['loginEmail'].value,
      this.loginForm.controls['loginPassword'].value)
      .subscribe(
        tokenData => {
          this.error = '';
          console.log(tokenData);
        },
        error => {
          if(error.error['error']==='Invalid Credentials!'){
            this.error ='Hibás e-mail-cím vagy jelszó!';
          }
        }
      );
  }

}
