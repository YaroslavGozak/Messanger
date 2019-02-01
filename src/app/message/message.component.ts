import { Component, OnInit, Input } from '@angular/core';
import { Time } from '@angular/common';
import { Contact } from '../contact';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() sender: Contact;
  @Input() content: string;
  @Input() sentTime: Time;
  @Input() isOwn: boolean;
  @Input() isRead: boolean;

  imagePath:any = "https://www.w3schools.com/bootstrap4/img_avatar1.png";

  constructor() { }

  ngOnInit() {
  }

}
