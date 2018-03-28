import { CompanyApiService } from './company.api.service';
import { Project } from '../projects/project';
import { Contact } from '../contacts/contact';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { Company, Country, EmployeesNumber, Industry, YearlyIncome } from './company';
import { BaseService } from '../base/base.service';

@Injectable()
export class CompanyService extends BaseService{
    private companies: Company[];
    private countries: Country[];
    private industries: Industry[];
    private employeesNums: EmployeesNumber[];
    private yearlyIncomes: YearlyIncome[];
    isLoading = true;
    isLoadingForEdit = true;
    checkedArray = new Subject<number[]>();

    constructor(
        private companyApiService: CompanyApiService
    ){
        super();
        this.companyApiService.getCompanies().subscribe(
            (companies: Company[]) => {
                this.companies = companies;
                this.isLoading = false;
            },
            (error: Response) => console.log(error)
        );
    }

    getStartingdatas(): void{
        
    }

    getItems (): Company[] {
        return this.companies;
    }

    getItem(company: Company | number): Company{
        const id = typeof company === 'number' ? company : company.id;
        if(this.companies)
            return this.companies.find((company: Company) => company.id === id);
        else{
            this.companyApiService.getCompany(id).subscribe(
                (company: Company) => {
                    this.isLoading = false;
                    return company;
                }
            );
        }
    }

    getCountries(): Country[] {
        return this.countries;
    }

    getIndustries(): Industry[] {
        return this.industries;
    }

    getEmployeesNums(): EmployeesNumber[]{
        return this.employeesNums;
    }

    getYearlyIncomes(): YearlyIncome[]{
        return this.yearlyIncomes;
    }

    delete(company: Company | number): void {
        const id = typeof company === 'number' ? company : company.id;
        this.companies.splice(this.companies.indexOf(
            this.companies.find(deletedCompany => deletedCompany.id === id)), 1
        );
        this.companyApiService.deleteCompany(id).subscribe();
    }

    add(company: Company): void{
        this.companyApiService.addCompany(company).subscribe(
            (res: Response) => {
                company.id = res['company']['id'];
                console.log(company, res['company']['id']);
                this.companies.push(company);
            }
        );
    }

    /*A paraméterben kapott cég alapján azonosítja a módosítani kívánt
    céget és küld egy kérést a http.put segítségével az apinak.*/
    update (company: Company): void{
        this.companies.find(oldCompany => oldCompany.id === company.id)[0] = company;
        this.companyApiService.updateCompany(company).subscribe();
    }

    getEditItems() {
        this.companyApiService.getCountries().subscribe(
            (countries: Country[]) => {
                this.countries = countries;
                this.companyApiService.getIndustries().subscribe(
                    (industries: Industry[]) => {
                        this.industries = industries;
                        this.companyApiService.getEmployeesnumbers().subscribe(
                            (employeesNums: EmployeesNumber[]) => {
                                this.employeesNums = employeesNums;
                                this.companyApiService.getYearlyincomes().subscribe(
                                    (yearlyIncomes: YearlyIncome[]) => {
                                        this.yearlyIncomes = yearlyIncomes;
                                        this.isLoadingForEdit = false;
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }

    getCertainItems(item: Contact | Project): any{
        /* if(this.companies){
            let companies: Company[] = [];
            if(item.company.length > 0){
                item.company.forEach(companyID => {
                    companies.push(this.companies.find(company => company.id === companyID));
                });
            }
            return companies;
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.getCertainItems(item);
        } */
    }

    modifyItems(item: Contact | Project): void{
        if(this.companies){
            if(item.hasOwnProperty('full_name')){
                let companyToBeModified = this.companies
                    .filter(comp => comp.contact.find(contact => contact.id === item.id))
                    .filter(company => !item.company.includes(company));
                companyToBeModified.forEach(company => {
                    company.contact.splice(company.contact.indexOf(item as Contact), 1);
                });
                if(item.company.length > 0){
                    item.company.forEach((company: Company) => {
                        const actualCompany = this.companies.find(comp => comp.id === company.id);
                        if(actualCompany.contact.filter(contact => contact.id === item.id).length === 0 ){
                            actualCompany.contact.push(item as Contact);
                        }
                    })
                }
            } else if(item.hasOwnProperty('deadline')) {
                let companyToBeModified = this.companies
                    .filter(comp => comp.project.find(project => project.id === item.id))
                    .filter(company => !item.company.includes(company));
                companyToBeModified.forEach(company => {
                    company.project.splice(company.project.indexOf(item as Project), 1);
                });
                if(item.company.length > 0){
                    item.company.forEach((company: Company) => {
                        const actualCompany = this.companies.find(comp => comp.id === company.id);
                        if(actualCompany.project.filter(project => project.id === item.id).length === 0){
                            actualCompany.project.push(item as Project);
                        }
                    })
                }
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.modifyItems(item);
        }
    }

    deleteItems(item: Contact | Project): void{
        if(this.companies){
            if(item.hasOwnProperty('full_name')){
                this.companies.filter(companies => companies.contact.find(contact => contact.id === item.id))
                .forEach(company => {
                    company.contact.splice(company.contact.indexOf(item as Contact), 1);
                });
            } else if(item.hasOwnProperty('deadline')) {
                this.companies.filter(companies => companies.project.find(project => project.id === item.id))
                .forEach(company => {
                    company.project.splice(company.project.indexOf(item as Project), 1);
                });
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.deleteItems(item);
        }
    }
}