import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project, Status, Priority, Currency } from './project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import 'rxjs/add/operator/map'
import { ProjectApiService } from './project.api.service';

@Injectable()
export class ProjectService extends BaseService{
    private projects: Project[]; //Lokálisan is letároljuk az adatbázisból kinyert adatokat a gyorsabb működés miatt.
    private statuses: Status[];
    private priorities: Priority[];
    private currencies: Currency[];
    isLoading = true; //Az api-val kapcsolatos függvények lefutása ideéig true értéket tárol, majd ha végzett a függvény lefutott false-ra változik. Erre azért van szükség, mert addig a felhasználónak töltést jeleníthetünk meg.
    isLoadingForEdit = true; //Ugyan az vonatkozik rá, mint az isLoading-ra, csak ez az edit komponensben lesz hasznunkra.
    checkedArray = new Subject<number[]>();
    haveDone = new Subject<boolean>();

    constructor(
        private projectApiService: ProjectApiService
    ){
        super();
        this.projectApiService.getProjects().subscribe(
            (projects: Project[]) => {
                this.projects = projects;
                this.isLoading = false;
            }
        );
    }

	getItems(): Project[] {
		return this.projects;
    }

    /*Kinyerjük a lokálisan tárolt több-ből a nekünk szükséges projektet, vagy ha a tömb még nem állna 
    rendelkezésre, akkor az api segítségével szerezzük meg az szükséges adatokat. */
    getItem(project: Project | number): Project{
        const id = typeof project === 'number' ? project : project.id;
        if(this.projects)
            return this.projects.find((project: Project) => project.id === id);
        else{
            this.projectApiService.getProject(id).subscribe(
                (project: Project) => {
                    this.isLoading = false;
                    return project;
                }
            );
        }
    }

    getStatuses(): Status[] {
        return this.statuses;
    }

    getPriorities(): Priority[] {
        return this.priorities;
    }

    getCurrencies(): Currency[]{
        return this.currencies;
    }

    delete(project: Project | number): void{
        const id = typeof project === 'number' ? project : project.id;
        this.projects.splice(this.projects.indexOf(
            this.projects.find(deletedProject => deletedProject.id === id)), 1
        );
        this.projectApiService.deleteProject(id).subscribe();
    }

    add(project: Project): void{
        this.projectApiService.addProject(project).subscribe(
            (res: Response) => {
                project.id = res['project']['id'];
                console.log(project, res['project']['id']);
                this.projects.push(project);
            }
        );
    }

    update (project: Project): void{
        this.projects.find(oldProject => oldProject.id === project.id)[0] = project;
        this.projectApiService.updateProject(project).subscribe();
    }

    /*Edit komponens esetén szükségünk van az összes prioritásra, státuszra, pnznemre, ezért ezeket beszerezzük 
    az api segítségével és ezt a metódust hívjuk meg szerkesztéskor és új projekt felvitelekor. */
    getEditItems() {
        this.projectApiService.getStatuses().subscribe(
            (statuses: Status[]) => {
                this.statuses = statuses;
                this.projectApiService.getPriorities().subscribe(
                    (priorities: Priority[]) => {
                        this.priorities = priorities;
                        this.projectApiService.getCurrencies().subscribe(
                            (currencies: Currency[]) => {
                                this.currencies = currencies;
                                this.isLoadingForEdit = false;
                            }
                        );
                    }
                );
            }
        );
    }

    /* Hogy a felhasználói élmény a lehető legmegfelelőbb legyen, és ha egy névjegy módosítása esetén más 
    projekteket rendelnénk az adott névjegyhez ne kelljen újra betölteni az alkalmazást, hogy a már módosított 
    projektet kapjuk meg ezért van szükség erre a metódusra. Ez a metódos először is megvizsgálja, hogy a 
    projektek között van e olyan, melyben a paraméterben kapott névjegy adatai szerepelnek, viszont annak a 
    projekt listájában nincs benne ez a projekt, ekkor az adott projektből kitörli a feleslegesen tárolt 
    névjegyet. Ezután megvizsgálja hogy a kapott névjegy tartalmaz-e projektet az adatai között és ha igen, 
    akkor a projekt névjegy mezőjébe is letároljuk a névjegyet, de csak abban az esetben, ha még eddig nem volt 
    tárolva. */
    modifyItems(contact: Contact): void{
        if(this.projects){
            let projectToBeModified = this.projects
                .filter(x => x.contact.find(cont => cont.id === contact.id))
                .filter(project => !contact.project.includes(project));
            projectToBeModified.forEach(project => {
                project.contact.splice(project.contact.indexOf(contact), 1);
            });
            if(contact.project.length > 0){
                contact.project.forEach((project: Project) => {
                    const actualProject = this.projects.find(proj => proj.id === project.id);
                    if(actualProject.contact.filter(cont => cont.id === contact.id).length === 0){
                        actualProject.contact.push(contact);
                    }
                });
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.modifyItems(contact);
        }
    }

    /* Hasonlóan a modifyItems metódushoz, ez is a megfelelő felhasználói élmény biztosítása miatt készült el.
    Ez a metódus, akkor hajtódik végre ha a paraméterben kapott céget/névjegyet törölni szeretnénk, de nem 
    szeretnénk hogy a projektek között továbbra is megtaálható legyen a cég/névjegy. Ekkor ahelyett, hogy
    újra betöltenénk a friss adatokat az adatbázisból, annyit teszünk hogy a projektek közül kikeressük azokat,
    melyekben le van tárolva a paraméterben kapott érték és egyszerűen kitöröljük ezt az értéket belőlük. */
    deleteItems(item: Company | Contact): void{
        if(this.projects){
            if(item.hasOwnProperty('taxnumber')){
                this.projects.filter(projects => projects.company.find(company => company.id === item.id))
                .forEach(project => {
                    project.company.splice(project.company.indexOf(item as Company), 1);
                });
            } else if(item.hasOwnProperty('full_name')) {
                this.projects.filter(projects => projects.contact.find(contact => contact.id === item.id))
                .forEach(project => {
                    project.contact.splice(project.contact.indexOf(item as Contact), 1);
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