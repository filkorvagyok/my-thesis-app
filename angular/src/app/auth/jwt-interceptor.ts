import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
            
        return next.handle(req).do((event: HttpEvent<any>) =>
            {(asd)=> console.log(asd)},
            (error: any) => {
                if(error instanceof HttpErrorResponse){
                    if(error.status === 401){
                        this.authService.logout();
                    }
                }
            }
        );
    }
  
  }