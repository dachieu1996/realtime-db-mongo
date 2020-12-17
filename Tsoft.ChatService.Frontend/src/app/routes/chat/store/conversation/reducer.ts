import { loadConversationSuccessAction, loadConversationAction } from './actions';
import { ConversationState } from './state';
import { createReducer, on } from '@ngrx/store';

export const initialState: ConversationState = {
  data: null,
  loading: true
}

export const conversationsReducer = createReducer(
  initialState,
  on(loadConversationSuccessAction, (state, action) => ({ data: action.conversations, loading: false })),
  on(loadConversationAction, (state) => ({ ...state, loading: true }))
);
