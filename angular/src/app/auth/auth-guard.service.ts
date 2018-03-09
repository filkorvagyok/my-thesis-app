import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(!this.authService.isAuthenticated())
        {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}