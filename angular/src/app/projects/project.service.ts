import { AuthService } from './../auth/auth.service';
import { Task } from './../tasks/task';
import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import 'rxjs/add/operator/map'

export class ProjectForContact{
	project: Project;
	ranks: string[] = [];
}

@Injectable()
export class ProjectService extends BaseService{
    private projects: Project[];
    isLoading = true;
    checkedArray = new Subject<number[]>();
    private projectsUrl = 'api/projects';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){
        super();
        this.getStartingdatas();
    }

    getProjects(): Observable<Project[]>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/projects?token=' + token)
        .map(
            (res: Response) => {
                let projects: Project[] = [];
                const projs = res['projects'];
                projs.forEach(project => {
                    let p = new Project();
                    p = this.formatItem(p, project);
                    projects.push(p);
                });
                return projects;
            }
        );
    }

    getProject(id: number): Observable<Project>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/project/' + id + '?token=' + token)
        .map(
            (res: Response) => {
                let project = new Project();
                project = this.formatItem(project, res['project']);
                return project;
            }
        );
    }

    private formatItem(project: Project, res): Project{
        project.id = res['id'];
        project.name = res['name'];
        project.description = res['description'];
        project.file = res['file'];
        project.deadline = res['deadline'];
        project.status = res['status'];
        project.priority = res['priority'];
        project.currency = res['currency'];
        project.income = res['income'];
        project.expenditure = res['expenditure'];
        project.company = res['companies'];
        project.contact = res['contacts'];
        return project;
    }

    getStartingdatas(): void{
        this.http.get<Project[]>(this.projectsUrl)
			.pipe(
				tap(projects => (`fetched projects`)),
        		catchError(this.handleError('getProjects', []))
            )
            .subscribe(
                (projects: Project[]) => {
                    projects.forEach(project => project.deadline = new Date(project.deadline));
                    this.projects = projects;
                    this.isLoading = false;
                }
            );
    }

	getItems(): Project[] {
		return this.projects;
    }

    getItem(project: Project | number): Project{
        const id = typeof project === 'number' ? project : project.id;
        if(this.projects)
            return this.projects.find((project: Project) => project.id === id);
        else{
            const url = `${this.projectsUrl}/${id}`;
            this.http.get<Project>(url).pipe(
                tap(_ => (`fetched project id=${id}`)),
                catchError(this.handleError<Project>(`getProject id=${id}`))
            )
            .subscribe(
                (project: Project) => {
                    this.isLoading = false;
                    return project;
                }
            )
        }
    }

    delete(project: Project | number): void{
        const id = typeof project === 'number' ? project : project.id;
        this.projects.splice(this.projects.indexOf(
            this.projects.find(deletedProject => deletedProject.id === id)), 1
        );
    }

    add(project: Project): void{
        project.id = this.projects[this.projects.length - 1].id + 1;
        this.projects.push(project);
    }

    update (project: Project): void{
        this.projects.find(oldProject => oldProject.id === project.id)[0] = project;
    }

    getCertainItems(item: Company | Contact | Task): any {
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

    modifyItems(item: Company | Task): void{
        /* if(this.projects){
            if(item.hasOwnProperty('taxnumber')){
                let projectToBeModified = this.projects
                    .filter(x => x.company.includes(item.id))
                    .filter(project => !item.project.includes(project.id));
                projectToBeModified.forEach(project => {
                    project.company.splice(project.company.indexOf(item.id), 1);
                });
                if(item.project.length > 0){
                    item.project.forEach(projectID => {
                        const actualProject = this.projects.find(project => project.id === projectID);
                        if(!actualProject.company.includes(item.id)){
                            actualProject.company.push(item.id);
                            this.update(actualProject);
                        }
                    });
                }
            } else if(tasknak különleges property) {
                let projectToBeModified = this.projects
                    .filter(x => x.task.includes(item.id))
                    .filter(project => !item.project.includes(project.id));
                    projectToBeModified.forEach(project => {
                    project.task.splice(project.task.indexOf(item.id), 1);
                });
                if(item.project.length > 0){
                    item.project.forEach(projectID => {
                        const actualProject = this.projects.find(project => project.id === projectID);
                        if(!actualProject.task.includes(item.id)){
                            actualProject.task.push(item.id);
                            this.update(actualProject);
                        }
                    })
                }
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.modifyItems(item);
        } */
    }

    deleteItems(item: Company | Contact | Task): void{
        /* if(this.projects){
            if(item.hasOwnProperty('taxnumber')){
                this.projects.filter(projects => projects.company.includes(item.id))
                .forEach(project => {
                    project.company.splice(project.company.indexOf(item.id), 1);
                    this.update(project);
                });
            } else if(item.hasOwnProperty('full_name')) {
                this.projects.filter(projects => projects.accountable.includes(item.id))
                .forEach(project => {
                    project.accountable.splice(project.accountable.indexOf(item.id), 1);
                    this.update(project);
                });
                this.projects.filter(projects => projects.observer.includes(item.id))
                .forEach(project => {
                    project.observer.splice(project.observer.indexOf(item.id), 1);
                    this.update(project);
                });
                this.projects.filter(projects => projects.owner.includes(item.id))
                .forEach(project => {
                    project.owner.splice(project.owner.indexOf(item.id), 1);
                    this.update(project);
                });
                this.projects.filter(projects => projects.participant.includes(item.id))
                .forEach(project => {
                    project.participant.splice(project.participant.indexOf(item.id), 1);
                    this.update(project);
                });
            } else if(tasknak különleges property) {
                this.projects.filter(projects => projects.task.includes(item.id))
                .forEach(project => {
                    project.task.splice(project.task.indexOf(item.id), 1);
                    this.update(project);
                });
            }
        } else {
            while(this.isLoading === true){
                continue;
            }
            this.deleteItems(item);
        } */
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