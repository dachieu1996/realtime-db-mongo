import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';

import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export enum ActionTypes {
  LOAD_CONVERSATIONS = '[Conversation] Load Conversations',
  LOAD_CONVERSATIONS_SUCCESS = '[Conversation] Load Conversations Success',
  LOAD_CONVERSATIONS_FAIL = '[Conversation] Load Conversations Fail',
  JOIN_CONVERSATION = '[Conversation] Join Conversations',
  REORDER_CONVERSATION = '[Conversation] Reorder Conversations',
  ADD_MESSAGE_TO_CONVERSATION = '[Conversation] Add Message To Conversation',
  USER_PRIVATE_ONLINE = '[Conversation] User Private Online'
}


export const loadConversationAction = createAction(ActionTypes.LOAD_CONVERSATIONS);
export const reorderConversationAction = createAction(ActionTypes.REORDER_CONVERSATION, props<{ conversations: Conversation[] }>());
export const loadConversationSuccessAction = createAction(ActionTypes.LOAD_CONVERSATIONS_SUCCESS, props<{ conversations: Conversation[] }>());
export const loadConversationFailAction = createAction(ActionTypes.LOAD_CONVERSATIONS_FAIL, props<{ error: string }>());
export const joinConversationAction = createAction(ActionTypes.JOIN_CONVERSATION, props<{ conversation: Conversation }>());
export const addMessageToConversationAction = createAction(ActionTypes.ADD_MESSAGE_TO_CONVERSATION, props<{ conversation: Conversation, message: Message }>());
export const userPrivateOnline = createAction(ActionTypes.USER_PRIVATE_ONLINE, props<{ users: User }>());
