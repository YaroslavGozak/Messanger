import { Component, OnInit } from '@angular/core';
import { Contact } from './../contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Array<Contact> = new Array<Contact>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts('1').subscribe(
      (list: Contact[]) => { this.contacts = list }
    );
  }
}
