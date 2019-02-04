import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages(1,{hours: 18, minutes: 46}, 200).subscribe(
      (messages: Message[]) => { this.messages = messages; }
    )
  }

}
