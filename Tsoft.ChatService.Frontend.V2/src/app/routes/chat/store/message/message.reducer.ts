import { messagesLoadedAction } from './../conversation/conversation.action';
import { receiveMessageSuccessAction } from './message.actions';

import { createReducer, on } from '@ngrx/store';
import { Message } from './../../models/Message';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';



export interface MessagesState extends EntityState<Message> {
  loading: boolean;
}


export const adapter: EntityAdapter<Message> =
  createEntityAdapter<Message>();


export const initialMessagesState: MessagesState = adapter.getInitialState({
  loading: true
});

export const messagesReducer = createReducer(
  initialMessagesState,
  on(receiveMessageSuccessAction, (state, { message }) => {
    return adapter.addOne(message, state);
  }),
  on(messagesLoadedAction, (state, { messages }) => {
    return adapter.upsertMany(messages, state);
  })
);


export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
