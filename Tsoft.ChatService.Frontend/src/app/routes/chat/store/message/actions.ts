import { Message } from './../../models/message';

import { Action, createAction, props } from '@ngrx/store';

export enum ActionTypes {
  LOAD_MESSAGES = '[Message] Load Messages',
  LOAD_MESSAGES_SUCCESS = '[Message] Load Messages Success',
  LOAD_MESSAGES_FAIL = '[Message] Load Messages Fail'
}


export const loadMessagesAction = createAction(ActionTypes.LOAD_MESSAGES)
export const loadMessagesSuccessAction = createAction(ActionTypes.LOAD_MESSAGES_SUCCESS, props<{ messages: Message[] }>())
export const loadMessagesFailAction = createAction(ActionTypes.LOAD_MESSAGES_FAIL, props<{ error: string }>())
