import { Conversation } from './../../models/conversation';
import { AppState } from './../state';
import { createSelector } from "@ngrx/store";

export const selectSelectedConversation = createSelector(
  (state: AppState) => state.conversations.selectedConversationId,
  (state: AppState) => state.conversations.data,
  (selectedConversationId: string, conversations: Conversation[]) => {
    if (conversations) {
      return conversations.find(x => x.id == selectedConversationId);
    } else
      return null;
  }
);

export const selectConversations = createSelector(
  (state: AppState) => state.conversations.data,
  (conversations: Conversation[]) => conversations
);
