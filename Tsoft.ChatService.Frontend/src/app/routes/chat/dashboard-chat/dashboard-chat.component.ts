import { ChatHubService } from './../service/chat-hub.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Component, OnInit, Inject } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-dashboard-chat',
  templateUrl: './dashboard-chat.component.html',
  styleUrls: ['./dashboard-chat.component.less']
})
export class DashboardChatComponent implements OnInit {
  private hubConnection: signalR.HubConnection

  constructor(
    private http: HttpClient,
    private chatHubService: ChatHubService,
  ) { }

  ngOnInit() {
    this.http.get('https://localhost:44321/user').toPromise().then(response => {

    });
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
