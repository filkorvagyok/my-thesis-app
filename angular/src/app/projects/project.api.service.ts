import { Project } from './project';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectApiService{

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ){}

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

    addProject(project: Project): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.projectToDatabase(project);
        return this.http.post('http://homestead.test/api/project?token=' + token, body, {headers: headers});
    }

    updateProject(project: Project): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.projectToDatabase(project);
        return this.http.put('http://homestead.test/api/project/' + project.id + '?token=' + token, body, {headers: headers});
    }

    private projectToDatabase(project: Project): string{
        const company_ids: number[] = [];
        const contact_ids: number[] = [];
        project.company.forEach(company => {
            company_ids.push(company.id);
        });
        project.contact.forEach(contact => {
            contact_ids.push(contact.id);
        });
        const body = JSON.stringify({
            name: project.name,
            description: project.description,
            file: project.file,
            deadline: project.deadline,
            status_id: project.status.id,
            priority_id: project.priority.id,
            currency_id: project.currency.id,
            income: project.income,
            expenditure: project.expenditure,
            company_id: company_ids,
            contact_id: contact_ids
        });
        return body;
    }

    deleteProject(project: Project | number): Observable<any>{
        const id = typeof project === 'number' ? project : project.id;
        const token = this.authService.getToken();
        return this.http.delete('http://homestead.test/api/project/' + id + '?token=' + token);
    }
}