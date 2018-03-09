import { Task } from '../tasks/task';
import { Project } from '../projects/project';
import { Contact } from '../contacts/contact';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Yearlyincome } from './models/yearlyincome';
import { Employeesnum } from './models/employeesnum';
import { Industry } from './models/industry';
import { Country } from './models/country';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Company } from './company';
import { BaseService } from '../base/base.service';

@Injectable()
export class CompanyService extends BaseService{
    private companies: Company[];
    private countries: Country[];
    private industries: Industry[];
    private employeesNums: Employeesnum[];
    private yearlyIncomes: Yearlyincome[];
    isLoading = true;
    checkedArray = new Subject<number[]>();

    private companiesUrl = 'api/companies';
    private countriesUrl = 'api/countries';
    private industriesUrl = 'api/industries';
    private employeesnumsUrl = 'api/employeesnums';
    private yearlyincomesUrl = 'api/yearlyincomes';

    constructor(private http: HttpClient){
        super();
        this.getStartingdatas();
    }

    getStartingdatas(): void{
        this.http.get<Company[]>(this.companiesUrl)
            .pipe(
                tap(companies => (`fetched companies`)),
                catchError(this.handleError('getCompanies', []))
            )
            .subscribe(
                (companies: Company[]) => {
                    this.companies = companies;
                    this.http.get<Country[]>(this.countriesUrl)
                        .pipe(
                            tap(countries => (`fetched countries`)),
                            catchError(this.handleError('getCountries', []))
                        )
                        .subscribe(
                            (countries: Country[]) => {
                                this.countries = countries;
                                this.http.get<Industry[]>(this.industriesUrl)
                                .pipe(
                                    tap(industries => (`fetched industries`)),
                                    catchError(this.handleError('getIndustries', []))
                                )
                                .subscribe(
                                    (industries: Industry[])=> {
                                        this.industries = industries;
                                        this.http.get<Employeesnum[]>(this.employeesnumsUrl)
                                        .pipe(
                                            tap(employeesnums => (`fetched employeesnums`)),
                                            catchError(this.handleError('getEmployeesnums', []))
                                        )
                                        .subscribe(
                                            (employeesnums: Employeesnum[]) => {
                                                this.employeesNums = employeesnums;
                                                this.http.get<Yearlyincome[]>(this.yearlyincomesUrl)
                                                .pipe(
                                                    tap(yearlyincomes => (`fetched yearlyincomes`)),
                                                    catchError(this.handleError('getYearlyincomes', []))
                                                )
                                                .subscribe(
                                                    (yearlyIncomes: Yearlyincome[]) => {
                                                        this.yearlyIncomes = yearlyIncomes;
                                                        this.isLoading = false;
                                                    }
                                                )
                                            }
                                        )
                                    }
                                )
                            }
                        )
            });
    }

    getItems (): Company[] {
        return this.companies;
    }

    getItem(company: Company | number): Company{
        const id = typeof company === 'number' ? company : company.id;
        if(this.companies)
            return this.companies.find((company: Company) => company.id === id);
        else{
            const url = `${this.companiesUrl}/${id}`;
            this.http.get<Company>(url).pipe(
                tap(_ => (`fetched company id=${id}`)),
                catchError(this.handleError<Company>(`getCompany id=${id}`))
            )
            .subscribe(
                (company: Company) => {
                    this.isLoading = false;
                    return company;
                }
            )
        }
    }

    getCountries(): Country[] {
        return this.countries;
    }

    getIndustries(): Industry[] {
        return this.industries;
    }

    getEmployeesNums(): Employeesnum[]{
        return this.employeesNums;
    }

    getYearlyIncomes(): Yearlyincome[]{
        return this.yearlyIncomes;
    }

    delete(company: Company | number): void {
        const id = typeof company === 'number' ? company : company.id;
        /*const url = `${this.companiesUrl}/${id}`;
    
        this.http.delete<Company>(url, httpOptions).pipe(
          tap(_ => (`deleted company id=${id}`)),
          catchError(this.handleError<Company>('delete'))
        )
        .subscribe(
            () => { */
                this.companies.splice(this.companies.indexOf(
                    this.companies.find(deletedCompany => deletedCompany.id === id)), 1
                );
            /* }
        ); */
    }

    add(company: Company): void{
        /* this.http.post<Company>(this.companiesUrl, company, httpOptions).pipe(
        catchError(this.handleError<Company>('addCompany'))
        )
        .subscribe(
            (addedCompany: Company) => { */
                company.id = this.companies[this.companies.length - 1].id + 1;
                this.companies.push(company);
            /* }
        ); */
    }

    /*A paraméterben kapott cég alapján azonosítja a módosítani kívánt
    céget és küld egy kérést a http.put segítségével az apinak.*/
    update (company: Company): void{
        /* this.http.put(this.companiesUrl, company, httpOptions).pipe(
            tap(_ => (`updated company id=${company.id}`)),
            catchError(this.handleError<any>('updateCompany'))
        )
        .subscribe(
            (updatedCompany: Company) => { */
                this.companies.find(oldCompany => oldCompany.id === company.id)[0] = company;
           /*  }
        ); */
    }

    getCertainItems(item: Contact | Project | Task): Company[]{
        if(this.companies){
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
        }
    }

    modifyItems(item: Contact | Project | Task): void{
        if(this.companies){
            if(item.hasOwnProperty('full_name')){
                let companyToBeModified = this.companies
                    .filter(x => x.contact.includes(item.id))
                    .filter(company => !item.company.includes(company.id));
                companyToBeModified.forEach(company => {
                    company.contact.splice(company.contact.indexOf(item.id), 1);
                });
                if(item.company.length > 0){
                    item.company.forEach(companyID => {
                        const actualCompany = this.companies.find(company => company.id === companyID);
                        if(!actualCompany.contact.includes(item.id)){
                            actualCompany.contact.push(item.id);
                            this.update(actualCompany);
                        }
                    })
                }
            } else if(item.hasOwnProperty('deadline')) {
                let companyToBeModified = this.companies
                    .filter(x => x.project.includes(item.id))
                    .filter(company => !item.company.includes(company.id));
                companyToBeModified.forEach(company => {
                    company.project.splice(company.project.indexOf(item.id), 1);
                });
                if(item.company.length > 0){
                    item.company.forEach(companyID => {
                        const actualCompany = this.companies.find(company => company.id === companyID);
                        if(!actualCompany.project.includes(item.id)){
                            actualCompany.project.push(item.id);
                            this.update(actualCompany);
                        }
                    })
                }
            } else /*if(tasknak különleges property)*/ {
                let companyToBeModified = this.companies
                    .filter(x => x.task.includes(item.id))
                    .filter(company => !item.company.includes(company.id));
                companyToBeModified.forEach(company => {
                    company.task.splice(company.task.indexOf(item.id), 1);
                });
                if(item.company.length > 0){
                    item.company.forEach(companyID => {
                        const actualCompany = this.companies.find(company => company.id === companyID);
                        if(!actualCompany.task.includes(item.id)){
                            actualCompany.task.push(item.id);
                            this.update(actualCompany);
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

    deleteItems(item: Contact | Project | Task): void{
        if(this.companies){
            if(item.hasOwnProperty('full_name')){
                this.companies.filter(companies => companies.contact.includes(item.id))
                .forEach(company => {
                    company.contact.splice(company.contact.indexOf(item.id), 1);
                    this.update(company);
                });
            } else if(item.hasOwnProperty('deadline')) {
                this.companies.filter(companies => companies.project.includes(item.id))
                .forEach(company => {
                    company.project.splice(company.project.indexOf(item.id), 1);
                    this.update(company);
                });
            } else /*if(tasknak különleges property)*/ {
                this.companies.filter(companies => companies.task.includes(item.id))
                .forEach(company => {
                    company.task.splice(company.task.indexOf(item.id), 1);
                    this.update(company);
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