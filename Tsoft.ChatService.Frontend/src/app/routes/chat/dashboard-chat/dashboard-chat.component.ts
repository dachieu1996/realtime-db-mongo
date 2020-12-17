import { loadUsersAction } from './../store/user/actions';
import { AppState } from './../store/state';
import { selectAllUsers, selectLoadingUser } from './../store/user/selectors';
import { BehaviorSubject } from 'rxjs';
import { ChatHubService } from './../service/chat-hub.service';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { select, Store } from '@ngrx/store';
import { loadUsersSuccessAction } from '../store/user/actions';

@Component({
  selector: 'app-dashboard-chat',
  templateUrl: './dashboard-chat.component.html',
  styleUrls: ['./dashboard-chat.component.less']
})
export class DashboardChatComponent implements OnInit {
  rooms;
  users;
  // user$ = new BehaviorSubject(null);

  loading$ = this.store.select(selectLoadingUser);
  users$ = this.store.select(selectAllUsers);
  private hubConnection: signalR.HubConnection

  constructor(
    private http: HttpClient,
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
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        this.users = [...this.users];
        // this.users$.next(this.users);
      }
    })
  }

  async fetchRoomsAndUser() {
    this.store.dispatch(loadUsersAction());
    let rooms = await this.chatHubService.getRooms();
    let users = await this.chatHubService.getAllUsers();
    this.store.dispatch(loadUsersSuccessAction({ users }));
    // this.rooms$.next(this.rooms);
  }
}
