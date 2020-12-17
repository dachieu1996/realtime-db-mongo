import { MessageState } from './state';
import { loadMessagesSuccessAction, loadMessagesAction } from './actions';

import { createReducer, on } from '@ngrx/store';


export const initialState: MessageState = {
  data: [],
  loading: true
}

export const messagesReducer = createReducer(
  initialState,
  on(loadMessagesAction, (state) => ({ ...state, loading: true })),
  on(loadMessagesSuccessAction, (state, action) => ({ data: action.messages, loading: false }))
);
