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
    contacts: Contact[];
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
        this.contacts.push(contact);
        this.contactApiService.addContact(contact).subscribe();
    }

    update (contact: Contact): void{
        this.contacts.find(oldContact => oldContact.id === contact.id)[0] = contact;
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

    modifyItems(item: Company | Project | Task): void{
        /* if(this.contacts){
            if(item.hasOwnProperty('taxnumber')){
                let contactToBeModified = this.contacts
                    .filter(x => x.company.includes(item.id))
                    .filter(contact => !(item as Company).contact.includes(contact.id));
                contactToBeModified.forEach(contact => {
                    contact.company.splice(contact.company.indexOf(item.id), 1);
                });
                if((item as Company).contact.length > 0){
                    (item as Company).contact.forEach(contactID => {
                        const actualContact = this.contacts.find(contact => contact.id === contactID);
                        if(!actualContact.company.includes(item.id)){
                            actualContact.company.push(item.id);
                            this.update(actualContact);
                        }
                    });
                }
            } else if(item.hasOwnProperty('deadline')) {
                let contactToBeModified = this.contacts
                    .filter(x => x.project.includes(item.id))
                    .filter(contact => (!(item as Project).accountable.includes(contact.id) &&
                    !(item as Project).observer.includes(contact.id) &&
                    !(item as Project).owner.includes(contact.id) &&
                    (item as Project).participant.includes(contact.id)));
                contactToBeModified.forEach(contact => {
                    contact.project.splice(contact.project.indexOf(item.id), 1);
                });
                if((item as Project).accountable.length > 0){
                    (item as Project).accountable.forEach(contactID => {
                        const actualContact = this.contacts.find(contact => contact.id === contactID);
                        if(!actualContact.project.includes(item.id)){
                            actualContact.project.push(item.id);
                            this.update(actualContact);
                        }
                    });
                } else if((item as Project).observer.length > 0){
                    (item as Project).observer.forEach(contactID => {
                        const actualContact = this.contacts.find(contact => contact.id === contactID);
                        if(!actualContact.project.includes(item.id)){
                            actualContact.project.push(item.id);
                            this.update(actualContact);
                        }
                    });
                } else if((item as Project).owner.length > 0){
                    (item as Project).owner.forEach(contactID => {
                        const actualContact = this.contacts.find(contact => contact.id === contactID);
                        if(!actualContact.project.includes(item.id)){
                            actualContact.project.push(item.id);
                            this.update(actualContact);
                        }
                    });
                } else if((item as Project).participant.length > 0){
                    (item as Project).participant.forEach(contactID => {
                        const actualContact = this.contacts.find(contact => contact.id === contactID);
                        if(!actualContact.project.includes(item.id)){
                            actualContact.project.push(item.id);
                            this.update(actualContact);
                        }
                    });
                }
            } else if(tasknak különleges property)if(!(item instanceof Project)) {
                let contactToBeModified = this.contacts
                    .filter(x => x.task.includes(item.id))
                    .filter(contact => !item.contact.includes(contact.id));
                contactToBeModified.forEach(contact => {
                    contact.task.splice(contact.task.indexOf(item.id), 1);
                });
                if(item.contact.length > 0){
                    item.contact.forEach(contactID => {
                        const actualContact = this.contacts.find(contact => contact.id === contactID);
                        if(!actualContact.task.includes(item.id)){
                            actualContact.task.push(item.id);
                            this.update(actualContact);
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

    deleteItems(item: Company | Project | Task): void{
        /* if(this.contacts){
            if(item.hasOwnProperty('taxnumber')){
                this.contacts.filter(contacts => contacts.company.includes(item.id))
                .forEach(contact => {
                    contact.company.splice(contact.company.indexOf(item.id), 1);
                    this.update(contact);
                });
            } else if(item.hasOwnProperty('deadline')) {
                this.contacts.filter(contacts => contacts.project.includes(item.id))
                .forEach(contact => {
                    contact.project.splice(contact.project.indexOf(item.id), 1);
                    this.update(contact);
                });
            } else if(tasknak különleges property) {
                this.contacts.filter(contacts => contacts.task.includes(item.id))
                .forEach(contact => {
                    contact.task.splice(contact.task.indexOf(item.id), 1);
                    this.update(contact);
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