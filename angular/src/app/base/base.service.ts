import { ProjectForContact } from './../projects/project.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Company } from './../companies/company';
import { Contact } from './../contacts/contact';
import { Project } from './../projects/project';
import { Task } from './../tasks/task';

export abstract class BaseService{
    constructor(){}

    abstract getStartingdatas (): void;
    abstract getItems (): Company[] | Contact[] | Project[] | Task[];
    abstract getItem (item: any | number): Company | Contact | Project | Task;
    abstract delete (item: any | number): void;
    abstract add(item: any): void;
    abstract update (item: any): void;
    abstract getCertainItems (item: any): Company[] | Contact[] | Project[] | ProjectForContact[] | Task[];
    abstract modifyItems (item: any): void;
    abstract deleteItems (item: any): void;

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