import { Message } from '@/_interfaces/message.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByUser'
})
export class FilterByUserPipe implements PipeTransform {

  transform(messages: Message[], senderId: string): any[] {
    if (messages.length && senderId) {
      const filteredMessages = messages.filter((msg: Message) => msg.from === senderId);
      console.log(filteredMessages, senderId);
      return filteredMessages;
    } else if (messages.length) {
      console.log(messages, senderId);
      return messages;
    } else {
      return [];
    }
  }

}
