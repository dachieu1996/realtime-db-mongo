import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';

import { Action, createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LOAD_CONVERSATIONS = '[Conversation] Load Conversations',
  LOAD_CONVERSATIONS_SUCCESS = '[Conversation] Load Conversations Success',
  LOAD_CONVERSATIONS_FAIL = '[Conversation] Load Conversations Fail'
}


export const loadConversationAction = createAction(ActionTypes.LOAD_CONVERSATIONS)
export const loadConversationSuccessAction = createAction(ActionTypes.LOAD_CONVERSATIONS_SUCCESS, props<{ conversations: Conversation[] }>())
export const loadConversationFailAction = createAction(ActionTypes.LOAD_CONVERSATIONS_FAIL, props<{ error: string }>())
