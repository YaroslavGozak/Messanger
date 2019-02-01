import { Contact } from './contact';
import { Time } from '@angular/common';

export class Message{
    sender: Contact;
    content: string;
    sentTime: Time;
    isOwn: boolean;
    isRead: boolean;

    constructor(sender: Contact, content: string, sentTime: Time, isOwn: boolean, isRead: boolean){
        this.sender = sender;
        this.content = content;
        this.sentTime = sentTime;
        this.isOwn = isOwn;
        this.isRead = isRead;
    }
}