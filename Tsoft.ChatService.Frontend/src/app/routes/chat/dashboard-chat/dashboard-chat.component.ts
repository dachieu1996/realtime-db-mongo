import { BehaviorSubject } from 'rxjs';
import { ChatHubService } from './../service/chat-hub.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-dashboard-chat',
  templateUrl: './dashboard-chat.component.html',
  styleUrls: ['./dashboard-chat.component.less']
})
export class DashboardChatComponent implements OnInit {
  loading = true;
  rooms;
  users;
  rooms$ = new BehaviorSubject(null);
  users$ = new BehaviorSubject(null);
  private hubConnection: signalR.HubConnection;

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    if (document.hidden) {
      this.chatHubService.sendStatus(2);
    } else {
      this.chatHubService.sendStatus(1);
    }
  }

  constructor(
    private http: HttpClient,
    private chatHubService: ChatHubService,
  ) { }
  ngOnInit() {

    this.chatHubService.startedEvent$.subscribe(response => {
      if (response)
        this.fetchRoomsAndUser();
    })

    this.chatHubService.addUserEvent$.subscribe(data => {
      if (data && this.users) {
        this.users = [...this.users, data];
        this.users$.next(this.users);
      }
    })

    this.chatHubService.userOnlineEvent$.subscribe(data => {
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        this.users = [...this.users];
        this.users$.next(this.users);
      }
    })

    this.chatHubService.userOfflineEvent$.subscribe(data => {
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        this.users = [...this.users];
        this.users$.next(this.users);
      }
    })
    this.chatHubService.userBusyEvent$.subscribe(data => {
      if (data && this.users) {
        let index = this.users.findIndex(x => x.id == data.id);
        this.users[index] = data;
        this.users = [...this.users];
        this.users$.next(this.users);
      }
    })
    this.chatHubService.getRooms().then(response => {
      console.log(response);
    })
  }
  async fetchRoomsAndUser() {
    this.rooms = await this.chatHubService.getRooms();
    this.users = await this.chatHubService.getAllUsers();
    this.rooms$.next(this.rooms);
    this.users$.next(this.users);
    this.loading = false;
  }



  // public startConnection = () => {

  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl(environment.BASE_API_URL + 'chat-hub/?token=' + this.tokenService.get().token)
  //     .build();

  //   this.hubConnection
  //     .start()
  //     .then(() => console.log('Connection started'))
  //     .catch(err => console.log('Error while starting connection: ' + err))
  // }

}
