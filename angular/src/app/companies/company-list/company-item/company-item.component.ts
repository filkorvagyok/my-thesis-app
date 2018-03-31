import { CompanyService } from './../../company.service';
import { Router } from '@angular/router';
import { Company } from '../../company';
import { Component, OnInit, Input } from '@angular/core';
import { BaseItemComponent } from '../../../base/base-item.component'

@Component({
  selector: '[app-company-item]',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent extends BaseItemComponent implements OnInit {
  @Input() company: Company;

  constructor(
    public companyService: CompanyService,
    private router: Router
  ) {
    super(companyService);
  }

  navigateToDetail(id: number): void{
    this.router.navigate(['/company/shown', id]);
  }

  ngOnInit() {
  }

}
