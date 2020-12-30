import { selectAllMessages } from './../message/message.selector';
import { map } from 'rxjs/operators';
import { MessagesState } from './../message/message.reducer';
import { Conversation } from './../../models/conversation';

import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromConversation from "./conversation.reducer";
import * as fromMessage from "./../message/message.reducer";

export const selectConversationsState = createFeatureSelector<fromConversation.ConversationsState>("conversations");

export const selectAllConversations = createSelector(
  selectConversationsState,
  fromConversation.selectAll
);

export const selectAllConversationsLoading = createSelector(
  selectConversationsState,
  conversationState => conversationState.loading
);

export const selectSelectedConversation = createSelector(
  selectConversationsState,
  (conversationState) => {
    return conversationState.entities[conversationState.selectedConversationId]
  }
);

export const selectMessagesState = createFeatureSelector<fromMessage.MessagesState>("messages");

export const selectMessagesInSelectedConversation = createSelector(
  selectConversationsState,
  selectAllMessages,
  (conversationState, messages) => {
    return messages.filter(message => message.conversationId == conversationState.selectedConversationId)
  }
);
