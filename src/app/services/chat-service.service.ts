import { Message } from '../_interfaces/message.interface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { }

  storeNewChat(newMessages: Message[]) {
    const newChatToString = JSON.stringify(newMessages);
    localStorage.setItem('newChat', newChatToString);
  }

  getNewChat(): Observable<Message[]> {
    let newChatToString: string = localStorage.getItem('newChat') || '[]';
    return of(JSON.parse(newChatToString));
  }
}
