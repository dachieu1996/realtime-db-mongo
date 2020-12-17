import { BaseState } from './../shared/base-state';
import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';

export interface ConversationState extends BaseState<Conversation> {
}
