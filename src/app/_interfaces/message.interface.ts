export interface Message {
  type: string;
  text: string;
  from: string;
  sender_name: string;
  to: string;
  timestamp: number;
}