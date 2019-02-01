import { Injectable } from '@angular/core';
import { Contact } from '../contact';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [
    new Contact(1, 'Yurii', 'Ivanov'),
    new Contact(2, 'Mike', 'Shevchik'),
    new Contact(3, 'Yaroslav', 'Gozak'),
    new Contact(4, 'Felicitas', 'Eckrich'),
    new Contact(5, 'Luan', 'Van der Merve'),
    new Contact(6, 'Tobias', 'Field'),
  ];

  constructor() { }

  getContacts(profileID: string): Observable<Contact[]>{
    return of(this.contacts);
  }

  getContactByID(id: number): Contact{
    return this.contacts.find((contact) => {return contact.ID == id});
  }
}
