import { Task } from '../tasks/task';
import { Project } from '../projects/project';
import { Company } from '../companies/company';
import { Subject } from 'rxjs/Subject';
import { Contact } from './contact';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import { ContactApiService } from './contact.api.service';

@Injectable()
export class ContactService extends BaseService{
    private contacts: Contact[];
    isLoading: boolean = true;
    checkedArray = new Subject<number[]>();

    constructor(
        private contactApiService: ContactApiService
    ){
        super();
        this.contactApiService.getContacts().subscribe(
            (contacts: Contact[]) => {
                this.contacts = contacts;
                this.isLoading = false;
            }
        );
    }

    getStartingdatas(){}

    getItems(): Contact[] {
		return this.contacts;
    }

    getItem(contact: Contact | number): Contact{
        const id = typeof contact === 'number' ? contact : contact.id;
        if(this.contacts){
            return this.contacts.find((contact: Contact) => contact.id === id);
        }
        else{
            this.contactApiService.getContact(id).subscribe(
                (contact: Contact) => {
                    this.isLoading = false;
                    return contact;
                }
            );
        }
    }
    
    delete(contact: Contact | number): void{
        const id = typeof contact === 'number' ? contact : contact.id;
        this.contacts.splice(this.contacts.indexOf(
            this.contacts.find(deletedContact => deletedContact.id === id)), 1
        );
        this.contactApiService.deleteContact(id).subscribe();
    }

    add(contact: Contact): void{
        contact.id = this.contacts[this.contacts.length - 1].id + 1;
        this.contactApiService.addContact(contact).subscribe(
            (res: Response) => {
                contact.id = res['contact']['id'];
                console.log(contact, res['contact']['id']);
                this.contacts.push(contact);
            }
        );
    }

    update (contact: Contact): void{
        const oldContactIndex = this.contacts.indexOf(this.contacts.find(oldContact => oldContact.id === contact.id));
        this.contacts[oldContactIndex] = contact;
        this.contactApiService.updateContact(contact).subscribe();
    }

    getCertainItems(item: Company | Project | Task, rank?: number): any{
        /* if(this.contacts){
            let contacts: Contact[] = [];
            if(item.hasOwnProperty('deadline')){
                item = (item as Project);
                switch (rank){
                    case 0:{
                        if(item.accountable.length > 0){
                            item.accountable.forEach(contactID => {
                                contacts.push(this.contacts.find(contact => contact.id === contactID));
                            });
                        }
                        return contacts;
                    }
                    case 1:{
                        if(item.observer.length > 0){
                            item.observer.forEach(contactID => {
                                contacts.push(this.contacts.find(contact => contact.id === contactID));
                            });
                        }
                        return contacts;
                    }
                    case 2:{
                        if(item.owner.length > 0){
                            item.owner.forEach(contactID => {
                                contacts.push(this.contacts.find(contact => contact.id === contactID));
                            });
                        }
                        return contacts;
                    }
                    case 3:{
                        if(item.participant.length > 0){
                            item.participant.forEach(contactID => {
                                contacts.push(this.contacts.find(contact => contact.id === contactID));
                            });
                        }
                        return contacts;
                    }
                    default:
                        return contacts;
                }

            }
            else if(!(item instanceof Project) && item.contact.length > 0){
                item.contact.forEach(contactID => {
                    contacts.push(this.contacts.find(contact => contact.id === contactID));
                });
            }
            return contacts;
        } else {
            while(this.isLoading === true){
                continue;
            }
            if(rank)
                this.getCertainItems(item, rank);
            else
                this.getCertainItems(item);
        } */
    }

    modifyItems(item: Company | Project): void{
        
    }

    deleteItems(item: Company | Project): void{
        if(this.contacts){
            if(item.hasOwnProperty('taxnumber')){
                this.contacts.filter(contacts => contacts.company.find(company => company.id === item.id))
                .forEach(contact => {
                    contact.company.splice(contact.company.indexOf(item as Company), 1);
                });
            } else if(item.hasOwnProperty('deadline')) {
                this.contacts.filter(contacts => contacts.project.find(project => project.id === item.id))
                .forEach(contact => {
                    contact.project.splice(contact.project.indexOf(item as Project), 1);
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