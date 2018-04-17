import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Company, Country, EmployeesNumber, Industry, YearlyIncome } from './company';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class CompanyApiService{

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ){}

    /*A bejelentkezés után eltárolt token segítségével lekérjük a cégek adatait az adatbázisból és formázzuk a 
    nekünk megfelelő alakra.*/
    getCompanies(): Observable<Company[]>{
        const token = this.authService.getToken(); //A bejelentkezéskor eltárolt token
        return this.http.get('/api/companies?token=' + token)
        .map(
            (res: Response) => {
                const companies: Company[] = [];
                const comps = res['companies'];
                comps.forEach(company => {
                    let c = new Company();
                    c = this.formatItem(c, company);
                    companies.push(c);
                });
                return companies;
            }
        );
    }

    /*Ugyan az a folyamat hajtódik végre, mint getCompanies esetén, de itt csak egy cég adatait kérjük le az 
    adabázisból és ehhez felhasználjuk a paraméterben kapott id-it is.*/
    getCompany(id: number): Observable<Company>{
        const token = this.authService.getToken();
        return this.http.get('/api/company/' + id + '?token=' + token)
        .map(
            (res: Response) => {
                let company = new Company();
                company = this.formatItem(company, res['company']);
                return company;
            }
        );
    }

    //Itt formázzuk a céget a nekünk megfelelő alakra.
    private formatItem(company: Company, res): Company{
        company.id = res['id'];
        company.logo = res['logo'];
        company.name = res['name'];
        company.phone = res['phone'];
        company.email = res['email'];
        company.website = res['website'];
        company.facebook = res['facebook'];
        company.taxnumber = res['taxnumber'];
        const addresstype = res['addresstype'];
        addresstype.forEach(at => {
            switch(at['address_type']){
                case 'headquarter':{
                    company.headquarter.country.id = at['address']['country']['id'];
                    company.headquarter.country.code = at['address']['country']['code'];
                    company.headquarter.country.name = at['address']['country']['name'];
                    company.headquarter.zipcode = at['address']['zipcode'];
                    company.headquarter.settlement = at['address']['settlement'];
                    company.headquarter.address_line = at['address']['address_line'];
                    break;
                }
                case 'billing':{
                    company.billing.country.id = at['address']['country']['id'];
                    company.billing.country.code = at['address']['country']['code'];
                    company.billing.country.name = at['address']['country']['name'];
                    company.billing.zipcode = at['address']['zipcode'];
                    company.billing.settlement = at['address']['settlement'];
                    company.billing.address_line = at['address']['address_line'];
                }
                case 'mail':{
                    company.mailing.country.id = at['address']['country']['id'];
                    company.mailing.country.code = at['address']['country']['code'];
                    company.mailing.country.name = at['address']['country']['name'];
                    company.mailing.zipcode = at['address']['zipcode'];
                    company.mailing.settlement = at['address']['settlement'];
                    company.mailing.address_line = at['address']['address_line'];
                }
            }
        });
        company.industry = res['industry'];
        company.employeesnumber = res['employeesnumber'];
        company.yearlyincome = res['yearlyincome'];
        company.founded = res['founded'];
        company.project = res['projects'];
        company.contact = res['contacts'];
        return company;
    }

    //A paraméterben kapott céget eltároljuk az adatbázisban.
    addCompany(company: Company): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.companyToDatabase(company);
        return this.http.post('/api/company?token=' + token, body, {headers: headers});
    }

    //A paraméterben kapott céget lecseréljük a korábban ezzel az id-val tárolt céggel.
    updateCompany(company: Company): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.companyToDatabase(company);
        return this.http.put('/api/company/' + company.id + '?token=' + token, body, {headers: headers});
    }

    //A kapott céget átalakítjuk az adatvázisnak megfelelő formátumra.
    private companyToDatabase(company: Company): string{
        const project_ids: number[] = [];
        const contact_ids: number[] = [];
        company.project.forEach(project => {
            project_ids.push(project.id);
        });
        company.contact.forEach(contact => {
            contact_ids.push(contact.id);
        });
        const body = JSON.stringify({
            name: company.name,
            logo: company.logo,
            phone: company.phone,
            email: company.email,
            website: company.website,
            facebook: company.facebook,
            taxnumber: company.taxnumber,
            industry_id: company.industry.id,
            employeesnumber_id: company.employeesnumber.id,
            yearlyincome_id: company.yearlyincome.id,
            founded: company.founded,
            hq_country: company.headquarter.country.id,
            hq_zipcode: company.headquarter.zipcode,
            hq_settlement: company.headquarter.settlement,
            hq_address: company.headquarter.address_line,
            bi_country: company.billing.country.id,
            bi_zipcode: company.billing.zipcode,
            bi_settlement: company.billing.settlement,
            bi_address: company.billing.address_line,
            mail_country: company.mailing.country.id,
            mail_zipcode: company.mailing.zipcode,
            mail_settlement: company.mailing.settlement,
            mail_address: company.mailing.address_line,
            project_id: project_ids,
            contact_id: contact_ids
        });
        return body;
    }

    deleteCompany(company: Company | number): Observable<any>{
        const id = typeof company === 'number' ? company : company.id;
        const token = this.authService.getToken();
        return this.http.delete('/api/company/' + id + '?token=' + token);
    }

    getCountries(): Observable<Country[]>{
        const token = this.authService.getToken();
        return this.http.get('/api/countries?token=' + token)
        .map(
            (res: Response) => {
                const countries: Country[] = [];
                const x = res['countries'];
                x.forEach(country => {
                    const c: Country = <Country>{
                        id: country['id'],
                        code: country['code'],
                        name: country['name']
                    };
                    countries.push(c);
                });
                return countries;
            }
        );
    }

    getEmployeesnumbers(): Observable<EmployeesNumber[]>{
        const token = this.authService.getToken();
        return this.http.get('/api/employeesnumbers?token=' + token)
        .map(
            (res: Response) => {
                const employeesnumbers: EmployeesNumber[] = [];
                const x = res['employeesnumbers'];
                x.forEach(employeesnumber => {
                    const en: EmployeesNumber = <EmployeesNumber>{
                        id: employeesnumber['id'],
                        range: employeesnumber['range']
                    };
                    employeesnumbers.push(en);
                });
                return employeesnumbers;
            }
        );
    }

    getIndustries(): Observable<Industry[]>{
        const token = this.authService.getToken();
        return this.http.get('/api/industries?token=' + token)
        .map(
            (res: Response) => {
                const industries: Industry[] = [];
                const x = res['industries'];
                x.forEach(industry => {
                    const i: Industry = <Industry>{
                        id: industry['id'],
                        name: industry['name']
                    };
                    industries.push(i);
                });
                return industries;
            }
        );
    }

    getYearlyincomes(): Observable<YearlyIncome[]>{
        const token = this.authService.getToken();
        return this.http.get('/api/yearlyincomes?token=' + token)
        .map(
            (res: Response) => {
                const yearlyincomes: YearlyIncome[] = [];
                const x = res['yearlyincomes'];
                x.forEach(yearlyincome => {
                    const yi: YearlyIncome = <YearlyIncome>{
                        id: yearlyincome['id'],
                        range: yearlyincome['range']
                    };
                    yearlyincomes.push(yi);
                });
                return yearlyincomes;
            }
        );
    }
}