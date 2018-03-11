import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
  })
  export class HeaderComponent implements OnInit {
    isAuthenticated: boolean = false;
    @Output() clickEvent = new EventEmitter();

    constructor(protected authService: AuthService){}

    ngOnInit(){
      this.isAuthenticated = this.authService.isAuthenticated();
    }

    onLogout(): void{
      this.authService.logout();
    }

    toggleSidenav(){
      this.clickEvent.emit();
    }
  }