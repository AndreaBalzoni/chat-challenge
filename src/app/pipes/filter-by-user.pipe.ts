import { Message } from '../_interfaces/message.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByUser'
})
export class FilterByUserPipe implements PipeTransform {

  transform(messages: Message[], senderId: string): any[] {
    if (messages.length && senderId) {
      const filteredMessages = messages.filter((msg: Message) => msg.from === senderId);
      return filteredMessages;
    } else if (messages.length) {
      return messages;
    } else {
      return [];
    }
  }

}
