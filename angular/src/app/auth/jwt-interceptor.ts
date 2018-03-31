import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private inj: Injector) {}

    /*Ha http-vel kapcsolatos hibaüzenetet kapunk, megvizsgáljuk és 401-es hiba esetén kijelentkeztetjül a 
    felhasználót*/
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const authService = this.inj.get(AuthService);
            
        return next.handle(req).do((event: HttpEvent<any>) =>
            {(asd)=> console.log(asd)},
            (error: any) => {
                if(error instanceof HttpErrorResponse){
                    if(error.status === 401){
                        authService.logout();
                    }
                }
            }
        );
    }
  
  }