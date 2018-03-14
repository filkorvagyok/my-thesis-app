import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthService } from './../auth/auth.service';
import { MAT_DATE_LOCALE, MatDialogModule, MatToolbarModule } from '@angular/material';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        SidenavComponent,
        FooterComponent
    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        MatDialogModule,
        MatToolbarModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        SidenavComponent,
        FooterComponent
      ],
    providers: [
        AuthService,
        {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'}
    ]
})
export class CoreModule {}
