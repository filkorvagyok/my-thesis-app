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
    isLoading: boolean = true; //Az api-val kapcsolatos függvények lefutása ideéig true értéket tárol, majd ha végzett a függvény lefutott false-ra változik. Erre azért van szükség, mert addig a felhasználónak töltést jeleníthetünk meg.
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

    getItems(): Contact[] {
		return this.contacts;
    }

    /*Kinyerjük a lokálisan tárolt több-ből a nekünk szükséges névjegyet, vagy ha a tömbb még nem állna 
    rendelkezésre, akkor az api segítségével szerezzük meg az szükséges adatokat. */
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

    /* Ez a metódus a megfelelő felhasználói élmény biztosítása miatt készült el. Akkor hajtódik végre ha a 
    paraméterben kapott céget/projektet törölni szeretnénk, de nem szeretnénk hogy a névjegyek között továbbra 
    is megtaálható legyen a cég/projekt. Ekkor ahelyett, hogy újra betöltenénk a friss adatokat az adatbázisból 
    annyit teszünk hogy a névjegyek közül kikeressük azokat, melyekben le van tárolva a paraméterben kapott 
    érték és egyszerűen kitöröljük ezt az értéket belőlük. */
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
}