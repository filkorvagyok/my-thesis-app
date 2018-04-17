import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Ezek alapján vizsgálja meg a validitás ellenőrző, hogy az adott mezőbe e-mail írtunk-e.
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hidepass: boolean = true;
	hideconfpass: boolean = true;
	registerForm: FormGroup;
	constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ){
		/*Létrehozzunk egy formgroupot, amiben az input mezők és a rájuk vonatkozó jogosultsági szabályok 
		találhatók.*/
			this.registerForm = fb.group({
				'registerEmail': [null, Validators.compose([Validators.required,
					Validators.pattern(EMAIL_REGEXP)])],
				'registerPassword': [null, Validators.compose([Validators.required,
					Validators.pattern(PASS_REGEX)])],
				'registerConfirmPassword': [null, Validators.required]
			},
			{validator: this.checkIfMatchingPasswords('registerPassword', 'registerConfirmPassword')}
		);
  }

  ngOnInit() {
  }

	//Ezzel a függvénnyel vizsgáljuk, hogy a két megadott jelszó megyegyezik-e
	checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string){
		return (group: FormGroup) => {
			let passwordInput = group.controls[passwordKey],
			passwordConfirmationInput = group.controls[passwordConfirmationKey];
			if (passwordInput.value !== passwordConfirmationInput.value) {
				return passwordConfirmationInput.setErrors({notEquivalent: true})
			}
			else {
				return passwordConfirmationInput.setErrors(null);
			}
		}
	}

	/*Az authservice signup függvényének átadjuk az inputmezők adatait majd, sikeres regisztráció esetén be is
	 jelentkezünk az authservice singin függvényével.*/
	onSignup(): void{
    this.authService.signup(
      this.registerForm.controls['registerEmail'].value,
			this.registerForm.controls['registerPassword'].value).subscribe(
        response => {
          console.log(response);
          this.authService.signin(this.registerForm.controls['registerEmail'].value,
					this.registerForm.controls['registerPassword'].value).subscribe(
						tokenData => console.log(tokenData),
						error => console.log(error)
					);
        },
        error => console.log(error),
      );
  }

}
