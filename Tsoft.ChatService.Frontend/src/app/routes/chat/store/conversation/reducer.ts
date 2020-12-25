import { loadConversationSuccessAction, loadConversationAction, joinConversationAction, reorderConversationAction, addMessageToConversationAction } from './actions';
import { ConversationState } from './state';
import { createReducer, on } from '@ngrx/store';

export const initialState: ConversationState = {
  data: null,
  loading: true
}

export const conversationsReducer = createReducer(
  initialState,
  on(loadConversationSuccessAction, (state, action) => ({ data: action.conversations, loading: false })),
  on(reorderConversationAction, (state, action) => ({ ...state, data: action.conversations })),
  on(loadConversationAction, (state) => ({ ...state, loading: true })),
  on(joinConversationAction, (state, action) => ({ ...state, selectedConversation: action.conversation })),
  on(addMessageToConversationAction, (state, action) => {
    let newConversations = [...state.data];
    let index;
    if (action.conversation.id) {
      index = newConversations.findIndex(x => x.id == action.conversation.id);
    } else {
      index = newConversations.findIndex(x => x.receiverId == action.conversation.receiverId);
    }
    let newConversation = { ...action.conversation };
    newConversation.messages = [...action.conversation.messages, action.message];

    newConversations[index] = newConversation;

    if (state.selectedConversation && state.selectedConversation.id == newConversation.id) {
      return { ...state, data: newConversations, selectedConversation: newConversations[index] }
    } else {
      return { ...state, data: newConversations }
    }
  })
);
