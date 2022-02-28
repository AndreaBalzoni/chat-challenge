import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import chat from '../../../assets/mock/chat.json';
import users from '../../../assets/mock/users.json';
import { User } from '../../_interfaces/user.interface';
import { ChatServiceService } from '../../services/chat-service.service';
import moment from 'moment';
import { NgForm } from '@angular/forms';
import { Message } from '../../_interfaces/message.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  public chat: any;
  public users: any;
  public moment: any;
  public currentUser: User;
  public otherUser: User;
  public newMessages: Message[] = [];
  public senderFilter: string;

  chatSub: Subscription = new Subscription();

  @ViewChild('chatContainer') containerEl: ElementRef;

  constructor(
    private cs: ChatServiceService,
    private cdRef:ChangeDetectorRef
  ) {
    this.chat = chat;
    this.users = users.users;
    this.currentUser = users.users[0];
    this.otherUser = users.users[1];
    this.cs = cs;
    this.senderFilter = '';
  }
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.chatSub = this.cs.getNewChat().subscribe({
      next: (res) => {
        this.newMessages = res;
        this.chat.messages = this.chat.messages.concat(this.newMessages);
        this.scrollToEnd();
      }
    });
    this.cdRef.detectChanges();
  }

  private scrollToEnd(): void {
    setTimeout(() => {
      this.containerEl.nativeElement.scrollTop = this.containerEl.nativeElement.scrollHeight;
    }, 0);
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

  setSenderId(event: string): void {
    this.senderFilter = this.senderFilter ? '' : event;
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.chatSub.unsubscribe();
  }

}

