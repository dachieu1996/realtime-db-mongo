import { User } from './user';
export interface Message {
  id?: string,
  content: string,
  timestamp: Date,
  senderId: string,
  receiverId?: string,
  conversationId?: string
}
