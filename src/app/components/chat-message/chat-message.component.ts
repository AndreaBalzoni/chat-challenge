import { Message } from '../../_interfaces/message.interface';
import { User } from '../../_interfaces/user.interface';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  public moment: any;
  public senderFilter: string;

  @Input() message: Message;
  @Input() users: User[];
  @Input() currentUser: User;
  @Input() index: number;

  @Output() emitSenderId = new EventEmitter<string>();

  @ViewChild('msg') msgEl: ElementRef;

  constructor(
    private cdRef:ChangeDetectorRef
    ) {
    this.moment = moment;
  }

  ngOnInit(): void {
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (this.msgEl.nativeElement.scrollHeight > this.msgEl.nativeElement.clientHeight || this.msgEl.nativeElement.scrollWidth > this.msgEl.nativeElement.clientWidth) {
      this.msgEl.nativeElement.classList.add('collapsed');
    }
  }

  returnAvatar(senderId: string): string {
    return this.users.find((u: User) => u.id === senderId)?.avatar || '';
  }

  isCollapsed(): boolean {
    if (this.msgEl) {
      return this.msgEl.nativeElement.scrollHeight > this.msgEl.nativeElement.clientHeight || this.msgEl.nativeElement.scrollWidth > this.msgEl.nativeElement.clientWidth;
    } else {
      return false;
    }
  }

  isExpandable(): boolean {
    if (this.msgEl) {
      return this.msgEl.nativeElement.classList.contains('expanded');
    } else {
      return false;
    }
  }

  toggleText(): void {
    if (this.msgEl) {
      this.msgEl.nativeElement.classList.toggle('collapsed');
      this.msgEl.nativeElement.classList.toggle('expanded');
    }
  }

  filterByUser(senderId: string): void {
    this.senderFilter = this.senderFilter ? '' : senderId;
    this.emitSenderId.emit(this.senderFilter);
  }

}
