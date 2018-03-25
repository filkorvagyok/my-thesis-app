import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../auth/auth.service';
import { Contact } from './contact';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class ContactApiService{

    constructor(
      private authService: AuthService,
      private http: HttpClient  
    ){}

    getContacts(): Observable<Contact[]>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/contacts?token=' + token)
        .map(
            (res: Response) => {
                let contacts: Contact[] = [];
                const conts = res['contacts'];
                conts.forEach(contact => {
                    let c = new Contact();
                    c = this.formatItem(c, contact);
                    contacts.push(c);
                });
                return contacts;
            }
        );
    }

    getContact(id: number): Observable<Contact>{
        const token = this.authService.getToken();
        return this.http.get('http://homestead.test/api/contact/' + id + '?token=' + token)
        .map(
            (res: Response) => {
                let contact = new Contact();
                contact = this.formatItem(contact, res['contact']);
                return contact;
            }
        );
    }

    private formatItem(contact: Contact, res): Contact{
        contact.id = res['id'];
        contact.full_name = res['full_name'];
        contact.surname = res['surname'];
        contact.middle_name = res['middle_name'];
        contact.forename = res['forename'];
        contact.nickname = res['nickname'];
        contact.phone = res['phone'];
        contact.email = res['email'];
        contact.company = res['companies'];
        contact.project = res['projects'];
        return contact;
    }

    addContact(contact: Contact): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.contactToDatabase(contact);
        return this.http.post('http://homestead.test/api/contact?token=' + token, body, {headers: headers});
    }

    updateContact(contact: Contact): Observable<any>{
        const token = this.authService.getToken();
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        const body = this.contactToDatabase(contact);
        return this.http.put('http://homestead.test/api/contact/' + contact.id + '?token=' + token, body, {headers: headers});
    }

    private contactToDatabase(contact: Contact): string{
        const company_ids: number[] = [];
        const project_ids: number[] = [];
        contact.company.forEach(company => {
            company_ids.push(company.id);
        });
        contact.project.forEach(project => {
            project_ids.push(project.id);
        });
        const body = JSON.stringify({
            full_name: contact.full_name,
            surname: contact.surname,
            middle_name: contact.middle_name,
            forename: contact.forename,
            nickname: contact.nickname,
            phone: contact.phone,
            email: contact.email,
            company_id: company_ids,
            project_id: project_ids
        });
        return body;
    }

    deleteContact(contact: Contact | number): Observable<any>{
        const id = typeof contact === 'number' ? contact : contact.id;
        const token = this.authService.getToken();
        return this.http.delete('http://homestead.test/api/contact/' + id + '?token=' + token);
    }
}