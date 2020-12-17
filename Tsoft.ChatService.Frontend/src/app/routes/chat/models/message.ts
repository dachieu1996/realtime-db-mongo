export interface Message {
  id: string,
  content: string,
  timestamp: Date,
  senderId: string,
  conversationId: string
}
