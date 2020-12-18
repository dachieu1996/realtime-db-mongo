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
export class DashboardChatComponent implements OnInit, OnDestroy {
  rooms;
  users;

  loading$ = this.store.select(selectLoadingUser);
  users$ = this.store.select(selectAllUsers);

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
    this.chatHubService.startedEvent$.subscribe(response => {
      if (response)
        this.fetchRoomsAndUser();
    })

    this.chatHubService.addUserEvent$.subscribe(data => {
      if (data && this.users) {
        this.users = [...this.users, data];
        // this.users$.next(this.users);
      }
    })

    this.chatHubService.userOnlineEvent$.subscribe(data => {
      console.log('userOnlineEvent', data);

      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        const users = [...this.users];
        // this.users$.next(this.users);
        this.store.dispatch(loadUsersSuccessAction({ users }));
      }
    })

    this.chatHubService.userOfflineEvent$.subscribe(data => {
      console.log('userOfflineEvent', data);

      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        let users = [...this.users];
        // this.users$.next(this.users);
        this.store.dispatch(loadUsersSuccessAction({ users }));
      }
    })
    this.chatHubService.userBusyEvent$.subscribe(data => {
      console.log('userBusyEvent', data);
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        this.users = [...this.users];
        // this.users$.next(this.users);
        let users = [...this.users];

        this.store.dispatch(loadUsersSuccessAction({ users }));
      }
    })
  }

  ngOnDestroy() {
    console.log('rrrrrrrrrrrrrrrrr');
    this.chatHubService.sendStatus(UserStatus.OFFLINE);
  }

  async fetchRoomsAndUser() {
    this.store.dispatch(loadUsersAction());
    let users = await this.chatHubService.getAllUsers();
    this.users = [...users];
    this.store.dispatch(loadUsersSuccessAction({ users }));
    this.chatHubService.sendStatus(UserStatus.ONLINE);

    // this.rooms$.next(this.rooms);
  }
}
