import { Component, OnInit, OnDestroy } from '@angular/core';
import chat from '@/../assets/mock/chat.json';
import users from '@/../assets/mock/users.json';
import { User } from '@/_interfaces/user.interface';
import { ChatServiceService } from '@/services/chat-service.service';
import moment from 'moment';
import { NgForm } from '@angular/forms';
import { Message } from '@/_interfaces/message.interface';
import { Subscription } from 'rxjs';

// const moment = require('moment');

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public chat: any;
  public users: any;
  public moment: any;
  public currentUser: User;
  public otherUser: User;
  public chatContainerId: string = 'chat-container';
  public newMessages: Message[] = [];
  chatSub: Subscription = new Subscription();
  public senderFilter: string;

  constructor(
    private cs: ChatServiceService
  ) {
    this.chat = chat;
    this.users = users.users;
    this.currentUser = users.users[0];
    this.otherUser = users.users[1];
    this.moment = moment;
    this.senderFilter = '';
    this.cs = cs;
  }

  ngOnInit(): void {
    this.chatSub = this.cs.getNewChat().subscribe({
      next: (res) => {
        this.newMessages = res;
        this.chat.messages = this.chat.messages.concat(this.newMessages);
        this.scrollToEnd();
      }
    });
  }

  private scrollToEnd(): void {
    setTimeout(() => {
      var element: HTMLElement = document.getElementById(this.chatContainerId)!;
      element.scrollTop = element.scrollHeight;
    }, 0);
  }

  returnAvatar(senderId: string): string {
    return this.users.find((u: User) => u.id === senderId).avatar;
  }

  isCollapsed(msgId: string): boolean {
    var element: HTMLElement = document.getElementById(msgId)!;
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  isExpandable(msgId: string): boolean {
    var element: HTMLElement = document.getElementById(msgId)!;
    return element.classList.contains('expanded');
  }

  toggleText(msgId: string): void {
    var element: HTMLElement = document.getElementById(msgId)!;
    element.classList.toggle('collapsed');
    element.classList.toggle('expanded');
  }

  pushMessage(f: NgForm): void {
    var newMessage: Message = {
      type: "text",
      text: f.form.value.newMsg,
      from: this.currentUser.id,
      sender_name: this.currentUser.full_name,
      to: this.otherUser.id,
      timestamp: new Date().valueOf()
    };
    this.newMessages.push(newMessage);
    this.chat.messages.push(newMessage);
    this.cs.storeNewChat(this.newMessages);
    this.scrollToEnd();
    f.resetForm();
  }

  filterByUser(senderId: string) {
    this.senderFilter = this.senderFilter ? '' : senderId;
  }

  ngOnDestroy(): void {
    this.chatSub.unsubscribe();
  }

}

