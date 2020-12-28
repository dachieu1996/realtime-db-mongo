import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import * as fromMessage from "./message.reducer";


export const selectMessagesState = createFeatureSelector<fromMessage.MessagesState>("messages");


export const selectAllMessages = createSelector(
  selectMessagesState,
  fromMessage.selectAll
);
