import { MessageState } from './message/state';
import { ConversationState } from './conversation/state';
import { UserState } from './user/state';


export interface AppState {
  users: Readonly<UserState>;
  conversations: Readonly<ConversationState>,
  messages: Readonly<MessageState>
}
