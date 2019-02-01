import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages(1,{hours: 18, minutes: 46}, 200).subscribe(
      (messages: Message[]) => { this.messages = messages; }
    )
  }

}
