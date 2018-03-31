import { Project, Status, Priority, Currency } from './project';
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

    /*A bejelentkezés után eltárolt token segítségével lekérjük a projektek adatait az adatbázisból és 
    formázzuk a nekünk megfelelő alakra.*/
    getProjects(): Observable<Project[]>{
        const token = this.authService.getToken(); //A bejelentkezéskor eltárolt token
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

    /*Ugyan az a folyamat hajtódik végre, mint getProjects esetén, de itt csak egy projekt adatait kérjük le az 
    adabázisból és ehhez felhasználjuk a paraméterben kapott id-it is.*/
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

    //Itt formázzuk a projektet a nekünk megfelelő alakra.
    private formatItem(project: Project, res): Project{
        project.id = res['id'];
        project.name = res['name'];
        project.description = res['description'];
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

    //A paraméterben kapott projektet eltároljuk az adatbázisban.
    addProject(project: Project): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.projectToDatabase(project);
        return this.http.post('http://homestead.test/api/project?token=' + token, body, {headers: headers});
    }

    //A paraméterben kapott projektet lecseréljük a korábban ezzel az id-val tárolt projekttel.
    updateProject(project: Project): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.projectToDatabase(project);
        return this.http.put('http://homestead.test/api/project/' + project.id + '?token=' + token, body, {headers: headers});
    }

    //A kapott projektet átalakítjuk az adatvázisnak megfelelő formátumra.
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

    getStatuses(): Observable<Status[]>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/statuses?token=' + token)
        .map(
            (res: Response) => {
                const statuses: Status[] = [];
                const x = res['statuses'];
                x.forEach(status => {
                    const s: Status = <Status>{
                        id: status['id'],
                        state: status['state']
                    };
                    statuses.push(s);
                });
                return statuses;
            }
        );
    }

    getPriorities(): Observable<Priority[]>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/priorities?token=' + token)
        .map(
            (res: Response) => {
                const priorities: Priority[] = [];
                const x = res['priorities'];
                x.forEach(priority => {
                    const p: Priority = <Priority>{
                        id: priority['id'],
                        value: priority['value']
                    };
                    priorities.push(p);
                });
                return priorities;
            }
        );
    }

    getCurrencies(): Observable<Currency[]>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/currencies?token=' + token)
        .map(
            (res: Response) => {
                const currencies: Currency[] = [];
                const x = res['currencies'];
                x.forEach(currency => {
                    const c: Currency = <Currency>{
                        id: currency['id'],
                        code: currency['code'],
                        name: currency['name']
                    };
                    currencies.push(c);
                });
                return currencies;
            }
        );
    }
}