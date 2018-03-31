import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService{
    
    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    //A paraméterben kapott adatokat továbbítja az adatbázisnak.
    signup(username: string, email: string, password: string): Observable<any>{
        return this.http.post('http://homestead.test/api/user', {name: username, email: email, password: password},
            {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})});
    }

    signin(email: string, password: string): Observable<any>{
        console.log('email: ' + email + '   password: ' + password);
        return this.http.post('http://homestead.test/api/user/signin', {email: email, password: password},
            {headers: new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'})})
            .map(
                res => {
                    //Olvashatóvá és értelmezhetővé alakítjuk a token-t
                    this.router.navigate(['/']);
                    const token = res['token'];
                    const base64Url = token.split('.')[1];
                    const base64 = base64Url.replace('-', '+').replace('_', '/');
                    return {token: token, decoded: JSON.parse(window.atob(base64))};
                }
            )
            .do(
                tokenData => {
                    localStorage.setItem('token', tokenData.token);
                }
            );
    }

    logout(): void{
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
    
    getToken(): string{
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean{
        return localStorage.getItem('token') != null;
    }
}