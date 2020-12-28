import { Message } from './../../models/message';
import { Conversation } from './../../models/conversation';
import { Action, createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';


export enum ConversationActionTypes {
  ConversationRequested = '[Detail Conversation] Conversation Requested',
  ConversationLoaded = '[Conversations API] Conversation Loaded',
  AllConversationsRequested = '[List Conversations] All Conversations Requested',
  AllConversationsLoaded = '[Conversations API] All Conversations Loaded',
  AllConversationsCancelled = '[Conversations API] All Conversations Cancel',
  UpdateConversationSuccess = '[Detail Conversation] Upadte Conversation Success',

  SelectConversation = '[List Conversations] Select Conversation',
  AddManyConversations = '[List Conversations] Add Conversation Success',

  ConversationSaved = '[Edit Conversation Dialog] Conversation Saved',
  MessagesRequested = '[Detail Conversation] Messages Requested',
  MessagesLoaded = '[Messages API] Messages Loaded',
  MessagesCancelled = '[Messages API] Messages Cancelled',

  SendMessageRequested = '[Detail Conversation] Send Messesage Requested',
  SendMessageFail = '[Detail Conversation] Send Messesage Fail',
}

export const allConversationsRequestedAction = createAction(ConversationActionTypes.AllConversationsRequested);
export const allConversationsLoadedAction = createAction(ConversationActionTypes.AllConversationsLoaded, props<{ conversations: Conversation[] }>());
export const allConversationsCancelledAction = createAction(ConversationActionTypes.AllConversationsCancelled);
export const updateConversationSuccessAction = createAction(ConversationActionTypes.UpdateConversationSuccess, props<{ conversation: Conversation }>());

export const selectConversationAction = createAction(ConversationActionTypes.SelectConversation, props<{ selectedConversationId: string }>());
export const upsertManyConversationsAction = createAction(ConversationActionTypes.AddManyConversations, props<{ conversations: Conversation[] }>());

export const messagesRequestedAction = createAction(ConversationActionTypes.MessagesRequested, props<{ conversationId: string, offset: number, size: number }>());
export const messagesLoadedAction = createAction(ConversationActionTypes.MessagesLoaded, props<{ messages: Message[] }>());
export const messagesCancelledAction = createAction(ConversationActionTypes.MessagesCancelled);

export const sendMessageRequestedAction = createAction(ConversationActionTypes.SendMessageRequested, props<{ message: string, conversation: Conversation }>());
export const sendMessageFailAction = createAction(ConversationActionTypes.SendMessageFail);
