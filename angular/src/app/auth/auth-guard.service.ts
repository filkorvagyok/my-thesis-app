import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    /*Azt dönti el hogy az adott url-ről elnavigálhatja-e magát a felhasználó a kívánt linkre. Ezt az alapján 
    teszi, hogy a felhasználó be van-e jelentkezve. Ha nincs bejelentkezve, akkor a router elnavigálja a login 
    url-re és false értéket ad vissza. Ellenkező esetben true értékkel tér vissza. Erre a guard-ra azért van 
    szükség, hogy a felhasználó bejelentkezés nélkül ne tudja elérni az adatokat.*/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(!this.authService.isAuthenticated())
        {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}