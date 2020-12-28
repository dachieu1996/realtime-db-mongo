import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';
import { Action, createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export enum MessageActionTypes {
  ReceiveMessageSuccess = '[Message] Receive Message Success',
}

export const receiveMessageSuccessAction = createAction(MessageActionTypes.ReceiveMessageSuccess, props<{ message: Message }>());
