import { Contact } from './../contact';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ContactService } from './../contact.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from '../../base/base-list.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(
    protected contactService: ContactService,
  ) {}

  ngOnInit() {}
}
