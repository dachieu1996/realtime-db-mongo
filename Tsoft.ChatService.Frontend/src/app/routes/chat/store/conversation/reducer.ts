import { loadConversationSuccessAction, loadConversationAction, joinConversationAction, reorderConversationAction, addMessageToConversationAction, userPrivateOnline } from './actions';
import { ConversationState } from './state';
import { createReducer, on } from '@ngrx/store';
import { ConversationType } from '../../models/conversation';

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
    console.log("state", state);
    console.log("action", action);
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
    console.log("newConversations", newConversations);


    return { ...state, data: newConversations }
  }),
  on(userPrivateOnline, (state, action) => {
    let userOnlineConversations = [...state.data];
    let index;
    let actionUser = action.users.status;
    index = userOnlineConversations.findIndex(x => x.receiverId == action.users.id && x.type == ConversationType.PRIVATE);
    userOnlineConversations[index] = { ...userOnlineConversations[index], status: actionUser }
    return { ...state, data: userOnlineConversations }
  })
);
