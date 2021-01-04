import { selectAllConversations } from './conversation.selector';
import { Conversation } from './../../models/conversation';
import { Message } from './../../models/message';
import { ChatHubService } from './../../service/chat-hub.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom, tap } from "rxjs/operators";


import { select, Store } from '@ngrx/store';
import { ConversationActionTypes, messagesCancelledAction, messagesLoadedAction, allConversationsLoadedAction, allConversationsCancelledAction, updateStatusUserSuccessAction } from './conversation.action';
import { of } from 'rxjs';
import { User } from '../../models/user';

@Injectable()
export class ConversationEffects {

  constructor(
    private actions$: Actions,
    private chatHubService: ChatHubService,
    private store: Store
  ) { }

  @Effect()
  loadAllConversations$ = this.actions$
    .pipe(
      ofType(ConversationActionTypes.AllConversationsRequested),
      withLatestFrom(this.store.pipe(select(selectAllConversations))),
      filter(([action, allConversations]) => {
        if (allConversations.length > 0)
          return false;
        else
          return true;
      }),
      mergeMap(async (): Promise<Conversation[]> => {
        let conversations = await this.chatHubService.getAllConversations().catch(err => {
          console.log('error loading conversation ', err);
          this.store.dispatch(allConversationsCancelledAction());
          return [];
        })
        return conversations;
      }),
      map(conversations => allConversationsLoadedAction({ conversations }))
    );


  @Effect()
  loadMessagesOnConversation$ = this.actions$
    .pipe(
      ofType(ConversationActionTypes.MessagesRequested),
      mergeMap(async (payload: { conversationId: string, offset: number, size: number }) =>
        await this.chatHubService.getMessagesByConversationId(payload.conversationId, payload.offset, payload.size)
          .then((messages: Message[]) => {
            // this.store.dispatch(messagesLoadedAction({ messages }))
            return messages;
          })
          .catch(err => {
            console.log('error loading messages ', err);
            this.store.dispatch(messagesCancelledAction());
            return [];
          })
      ),
      map(messages => messagesLoadedAction({ messages }))
    );

  // @Effect()
  // userStatus$ = this.actions$
  //   .pipe(
  //     ofType(ConversationActionTypes.AllConversationsRequested),
  //     withLatestFrom(this.store.pipe(select(selectAllConversations))),
  //     filter(([action, allConversations]) => {
  //       if (allConversations.length > 0)
  //         return false;
  //       else
  //         return true;
  //     }),
  //     mergeMap(async (): Promise<User> => {
  //       let user = await this.chatHubService.listenUserStatus();
  //       return user;
  //     }),
  //     map(user => updateStatusUserSuccessAction({user: user}))
  //   );



  @Effect({ dispatch: false })
  sendMessageOnConversation$ = this.actions$
    .pipe(
      ofType(ConversationActionTypes.SendMessageRequested),
      mergeMap(async (payload: {
        message: string,
        conversation: Conversation
      }) =>
        this.chatHubService.sendMessage({ message: payload.message, conversation: payload.conversation })
      )
    );


}
