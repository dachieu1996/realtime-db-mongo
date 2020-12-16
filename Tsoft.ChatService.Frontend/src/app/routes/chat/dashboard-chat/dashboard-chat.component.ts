import { BehaviorSubject } from 'rxjs';
import { ChatHubService } from './../service/chat-hub.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  private hubConnection: signalR.HubConnection

  constructor(
    private http: HttpClient,
    private chatHubService: ChatHubService,
  ) { }

  ngOnInit() {

    this.chatHubService.startedEvent$.subscribe(response => {
      if (response)
        this.fetchRoomsAndUser();
    })

    // this.chatHubService.getRooms().then(response => {
    //   console.log(response);
    // })
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
