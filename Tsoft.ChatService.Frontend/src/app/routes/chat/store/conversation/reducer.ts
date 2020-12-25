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
  on(joinConversationAction, (state, action) => ({ ...state, selectedConversationId: action.conversation.id })),
  on(addMessageToConversationAction, (state, action) => {
    let newConversations = [...state.data];
    let newMessage = action.message;
    let index;
    if (action.conversation.id) {
      index = newConversations.findIndex(x => x.id == action.conversation.id);
      const messages = [...newConversations[index].messages, newMessage]

      newConversations[index] = { ...newConversations[index], messages }
    } else {
      index = newConversations.findIndex(x => x.receiverId == action.conversation.receiverId);
    }


    return { ...state, data: newConversations }
  })
);
