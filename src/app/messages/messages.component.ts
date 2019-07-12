import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  // 模板中使用了messageService，因此不能设置为private
  public messageService: MessageService;
  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  ngOnInit() {
  }

}
