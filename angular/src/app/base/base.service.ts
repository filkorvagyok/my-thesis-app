import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Company } from './../companies/company';
import { Contact } from './../contacts/contact';
import { Project } from './../projects/project';

export abstract class BaseService{
    constructor(){}

    abstract getItems (): Company[] | Contact[] | Project[];
    abstract getItem (item: any | number): Company | Contact | Project;
    abstract delete (item: any | number): void;
    abstract add(item: any): void;
    abstract update (item: any): void;
    abstract deleteItems (item: any): void;

    //Hibakezelő
    handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            (`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}