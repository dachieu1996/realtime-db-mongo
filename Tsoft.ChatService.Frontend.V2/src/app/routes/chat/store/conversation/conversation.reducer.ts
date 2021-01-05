import { DescendingDatetimeSort } from './../../../../helpers/ExtentionMethod';
import { allConversationsLoadedAction, upsertManyConversationsAction, selectConversationAction, updateConversationSuccessAction, updateStatusUserSuccessAction } from './conversation.action';
import { createReducer, on } from '@ngrx/store';
import { Conversation } from './../../models/conversation';

import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

export function sortByDescendingDate(item1: Conversation, item2: Conversation): number {
  return DescendingDatetimeSort(item1.lastActivityTime, item2.lastActivityTime);
}

export interface ConversationsState extends EntityState<Conversation> {
  loading: boolean;
  selectedConversationId: string;
}


export const adapter: EntityAdapter<Conversation> =
  createEntityAdapter<Conversation>({
    sortComparer: sortByDescendingDate
  });


export const initialConversationsState: ConversationsState = adapter.getInitialState({
  loading: true,
  selectedConversationId: null
});

export const conversationsReducer = createReducer(
  initialConversationsState,
  on(allConversationsLoadedAction, (state, action) => {
    return adapter.setAll(action.conversations, { ...state, loading: false })
  }),
  on(upsertManyConversationsAction, (state, action) => {
    return adapter.upsertMany(action.conversations, state)
  }),
  on(selectConversationAction, (state, { selectedConversationId }) => ({ ...state, selectedConversationId })),
  on(updateConversationSuccessAction, (state, { conversation }) => {
    const updateConversation: Update<Conversation> = {
      id: conversation.id,
      changes: {
        lastMessage: conversation.lastMessage,
        lastActivityTime: conversation.lastActivityTime,
        participants: conversation.participants,
      }
    };
    return adapter.updateOne(updateConversation, state);
  }),
  on(updateStatusUserSuccessAction, (state, { conversation, status }) => {
    const updateConversation: Update<Conversation> = {
      id: conversation.id,
      changes: {
        status: status
      }
    };
    return adapter.updateOne(updateConversation, state);
  })
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
