import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AnonymousGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    /*Az AuthGuard-ben található canActivate függvény ellentettje. Azt dönti el hogy az adott url-ről 
    elnavigálhatja-e magát a felhasználó a kívánt linkre. Ezt az alapján teszi, hogy a felhasználó be van-e 
    jelentkezve. Ha be van jelentkezve, akkor a router elnavigálja a company url-re és false értéket ad vissza. 
    Ellenkező esetben true értékkel tér vissza. Erre a guard-ra azért van szükség, hogy a felhasználó 
    bejelentkezése után ne tudja újra elérni a bejelentkezési felületet, csak miután kijelentkezett.*/
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if(this.authService.isAuthenticated())
        {
            this.router.navigate(['company']);
            return false;
        }
        return true;
    }
}