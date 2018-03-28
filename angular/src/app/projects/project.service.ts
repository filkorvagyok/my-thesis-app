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
    private projects: Project[];
    private statuses: Status[];
    private priorities: Priority[];
    private currencies: Currency[];
    isLoading = true;
    isLoadingForEdit = true;
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

    getStartingdatas(): void{
    }

	getItems(): Project[] {
		return this.projects;
    }

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

    getCertainItems(item: Company | Contact): any {
        /* if(this.projects){
            if(item.project.length > 0){
                if(item.hasOwnProperty('full_name')){
                    let projectsObject: ProjectForContact[] = [];
                    item.project.forEach(projectID => {
                        let ranks: string[] = [];
                        const actualProject: Project = this.projects.find(project => project.id === projectID);
                        if(actualProject.owner.includes(item.id))
                            ranks.push("tulajdonos");
                        if(actualProject.observer.includes(item.id))
                            ranks.push("megfigyelő");
                        if(actualProject.accountable.includes(item.id))
                            ranks.push("felelős");
                        if(actualProject.participant.includes(item.id))
                            ranks.push("részvevő");
                        projectsObject.push({project: actualProject, ranks: ranks});
                        ranks = [];
                    });
                    return projectsObject;
                } else {
                    let projects: Project[] = [];
                    item.project.forEach(projectID => {
                        projects.push(this.projects.find(project => project.id === projectID));
                    });
                    return projects;
                }
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.getCertainItems(item);
        } */
    }

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
    
    //Hibakezelő
	handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}