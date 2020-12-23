import { Conversation } from './../../models/conversation';
import { AppState } from './../state';
import { createSelector } from "@ngrx/store";

export const selectSelectedConversation = createSelector(
  (state: AppState) => state.conversations.selectedConversation,
  (selectedConversation: Conversation) => {
    return selectedConversation
  }
);

export const selectConversations = createSelector(
  (state: AppState) => state.conversations.data,
  (conversations: Conversation[]) => conversations
);
