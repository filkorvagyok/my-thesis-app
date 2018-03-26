import { Task } from './../tasks/task';
import { Contact } from './../contacts/contact';
import { Company } from './../companies/company';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import 'rxjs/add/operator/map'
import { ProjectApiService } from './project.api.service';

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