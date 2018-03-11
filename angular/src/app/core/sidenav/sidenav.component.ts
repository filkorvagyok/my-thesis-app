import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() clickNavLink = new EventEmitter();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogout(): void{
    this.authService.logout();
  }

  onClickNavLink(){
    this.clickNavLink.emit();
  }

}
