import { Message } from './message';
export interface Conversation {
  id: string,
  name?: string,
  type: ConversationType,
  lastMessage?: string,
  lastActivityTime?: string,
  participants: string[],
  messages: Message[]
}

export enum ConversationType {
  PRIVATE = "private",
  GROUP = "group"
}

