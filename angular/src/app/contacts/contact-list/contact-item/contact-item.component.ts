import { Contact } from './../../contact';
import { ContactService } from './../../contact.service';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../base/base-item.component';
import { Router } from '@angular/router';

@Component({
  selector: '[app-contact-item]',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss']
})
export class ContactItemComponent extends BaseItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor(
    public contactService: ContactService,
    private router: Router
  ) {
    super(contactService);
  }

  navigateToDetail(id: number): void{
    this.router.navigate(['/people/shown', id]);
  }

  ngOnInit() {
  }

}
