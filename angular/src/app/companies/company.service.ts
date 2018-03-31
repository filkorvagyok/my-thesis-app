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
    private companies: Company[]; //Lokálisan is letároljuk az adatbázisból kinyert adatokat a gyorsabb működés miatt.
    private countries: Country[];
    private industries: Industry[];
    private employeesNums: EmployeesNumber[];
    private yearlyIncomes: YearlyIncome[];
    isLoading = true; //Az api-val kapcsolatos függvények lefutása ideéig true értéket tárol, majd ha végzett a függvény lefutott false-ra változik. Erre azért van szükség, mert addig a felhasználónak töltést jeleníthetünk meg.
    isLoadingForEdit = true; //Ugyan az vonatkozik rá, mint az isLoading-ra, csak ez az edit komponensben lesz hasznunkra.
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

    getItems (): Company[] {
        return this.companies;
    }

    /*Kinyerjük a lokálisan tárolt több-ből a nekünk szükséges céget, vagy ha a tömb még nem állna 
    rendelkezésre, akkor az api segítségével szerezzük meg az szükséges adatokat. */
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

    addLogo(logo: FormData): void{
        console.log(logo);
        this.companyApiService.addLogo(logo).subscribe(
            (res: Response) => {
                console.log(res);
            }
        );
    }

    update (company: Company): void{
        this.companies.find(oldCompany => oldCompany.id === company.id)[0] = company;
        this.companyApiService.updateCompany(company).subscribe();
    }

    /*Edit komponens esetén szükségünk van az összes országra, iparágra, dolgozók számának kategóriára, éves 
    bevétel kategóriára, ezért ezeket beszerezzük az api segítségével és ezt a metódust hívjuk meg 
    szerkesztéskor és új cég felvitelekor. */
    getEditItems(): void{
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

    /* Hogy a felhasználói élmény a lehető legmegfelelőbb legyen, és ha egy névjegy vagy projekt módosítása 
    esetén más cégeket rendelnénk az adott névjegyhez vagy projekhez ne kelljen újra betölteni az alkalmazást, 
    hogy a már módosított cégeket kapjuk meg ezért van szükség erre a metódusra. Ez a metódos először is 
    megvizsgálja, hogy a cégek között van e olyan, melyben a paraméterben kapott névjegy/projekt adatai 
    szerepelnek, viszont annak a cégek listájában nincs benne ez a cég, ekkor az adott cégből kitörli a 
    feleslegesen tárolt névjegyet/projektet. Ezután megvizsgálja hogy a kapott névjegy/projekt tartalmaz e 
    céget az adatai között és ha igen, akkor a cég névjegy/projekt mezőjébe is letároljuk a névjegyet/projektet,
    de csak abban az esetben, ha még eddig nem volt tárolva. */
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

    /* Hasonlóan a modifyItems metódushoz, ez is a megfelelő felhasználói élmény biztosítása miatt készült el.
    Ez a metódus, akkor hajtódik végre ha a paraméterben kapott névjegyet/projektet törölni szeretnénk, de
    nem szeretnénk hogy a cégek között továbbra is megtaálható legyen a névjegy/projekt. Ekkor ahelyett, hogy
    újra betöltenénk a friss adatokat az adatbázisból, annyit teszünk hogy cégek közül kikeressük azokat,
    melyekben le van tárolva a paraméterben kapott érték és egyszerűen kitöröljük ezt az értéket belőlük. */
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