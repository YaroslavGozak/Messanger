import { Injectable } from '@angular/core';
import { Time } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Message } from './../message';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private contactService: ContactService) { }

  getMessages(profileID: number, to: Time, count: number): Observable<Message[]>{
    return of([
      new Message(this.contactService.getContactByID(1), 'Hello', {hours: 14, minutes: 14}, true, true),
      new Message(this.contactService.getContactByID(2), 'Hi', {hours: 14, minutes: 24}, false, true),
      new Message(this.contactService.getContactByID(1), 'How are you?', {hours: 14, minutes: 24}, true, true),
      new Message(this.contactService.getContactByID(2), 'I\'m fine, thanks! And you?', {hours: 14, minutes: 25}, false, true),
      new Message(this.contactService.getContactByID(1), 'I \'m fine too.', {hours: 14, minutes: 54}, true, true),
      new Message(this.contactService.getContactByID(2), 'Cool!', {hours: 15, minutes: 2}, false, true),
      new Message(this.contactService.getContactByID(1), 'Bye', {hours: 15, minutes: 13}, true, true),
      new Message(this.contactService.getContactByID(1), 'Bye', {hours: 15, minutes: 13}, false, false),
    ]);
  }

  sendMessage(receiverID: number, content: string): Observable<boolean>{
    return of(true);
  }

  editMessage(messageID: number, receiverID: number, content: string): Observable<boolean>{
    return of(true);
  }
}
