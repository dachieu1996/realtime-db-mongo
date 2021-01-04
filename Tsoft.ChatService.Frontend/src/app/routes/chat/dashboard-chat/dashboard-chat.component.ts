import { selectSelectedConversation, selectConversations } from './../store/conversation/selectors';
import { loadConversationAction, loadConversationSuccessAction, addMessageToConversationAction, userPrivateOnline } from './../store/conversation/actions';
import { Message } from './../models/message';
import { UserStatus } from './../models/user';
import { loadUsersAction, loadUsersSuccessAction } from './../store/user/actions';
import { AppState } from './../store/state';
import { selectAllUsers, selectLoadingUser } from './../store/user/selectors';
import { BehaviorSubject } from 'rxjs';
import { ChatHubService } from './../service/chat-hub.service';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ChangeDetectorRef, Inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import * as signalR from "@aspnet/signalr";
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard-chat',
  templateUrl: './dashboard-chat.component.html',
  styleUrls: ['./dashboard-chat.component.less']
})
export class DashboardChatComponent implements OnInit {
  rooms;
  users;
  selectedConversation$ = this.store.select(selectSelectedConversation);

  loading$ = this.store.select(selectLoadingUser);
  users$ = this.store.select(selectAllUsers);
  conversations$ = this.store.select(selectConversations);

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    if (this.chatHubService.isConnectionIsEstablished()) {
      if (document.hidden) {
        this.chatHubService.sendStatus(UserStatus.BUSY);
      } else {
        this.chatHubService.sendStatus(UserStatus.ONLINE);
      }
    }
  }

  constructor(
    private store: Store<AppState>,
    private chatHubService: ChatHubService
  ) { }
  ngOnInit() {
    this.store.dispatch(loadConversationAction());
    this.chatHubService.startedEvent$.subscribe(async response => {
      if (response) {
        await this.fetchAllConversations();
        await this.fetchRoomsAndUser();
      }
    })

    this.chatHubService.addUserEvent$.subscribe(data => {
      if (data && this.users) {
        this.users = [...this.users, data];
        // this.users$.next(this.users);
      }
    })

    this.chatHubService.userOnlineEvent$.subscribe(data => {
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        const users = [...this.users];
        // this.users$.next(this.users);
        //this.store.dispatch(loadUsersSuccessAction({ users }));
        this.store.dispatch(userPrivateOnline({ users: data }))


      }
    })

    this.chatHubService.userOfflineEvent$.subscribe(data => {
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        let users = [...this.users];
        // this.users$.next(this.users);
        //this.store.dispatch(loadUsersSuccessAction({ users }));
        this.store.dispatch(userPrivateOnline({ users: data }))
      }
    })
    this.chatHubService.userBusyEvent$.subscribe(data => {
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        this.users = [...this.users];
        // this.users$.next(this.users);
        let users = [...this.users];
        console.log("userbusy", this.users);
        this.store.dispatch(userPrivateOnline({ users: data }))

      }
    })
    this.chatHubService.newMessageEvent$.subscribe(data => {
      console.log('newMessage', data)
      if (data) {
        this.store.dispatch(addMessageToConversationAction({ conversation: data.conversation, message: data.message }))
      }
    })
  }

  async fetchRoomsAndUser() {
    this.store.dispatch(loadUsersAction());
    let users = await this.chatHubService.getAllUsers();
    this.users = [...users];
    this.store.dispatch(loadUsersSuccessAction({ users }));
    this.chatHubService.sendStatus(UserStatus.ONLINE);
    // this.rooms$.next(this.rooms);
  }

  async fetchAllConversations() {
    let conversations = await this.chatHubService.getAllConversations();
    this.store.dispatch(loadConversationSuccessAction({ conversations }));
  }
}
