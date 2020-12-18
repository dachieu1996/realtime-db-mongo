import { BehaviorSubject } from 'rxjs';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '@env/environment';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable()
export class ChatHubService {

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;
  public startedEvent$ = new BehaviorSubject(null);
  public addUserEvent$ = new BehaviorSubject(null);
  public userOnlineEvent$ = new BehaviorSubject(null);
  public userOfflineEvent$ = new BehaviorSubject(null);
  public userBusyEvent$ = new BehaviorSubject(null);
  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message) {
    this._hubConnection.invoke('NewMessage', message);
  }

  getAllUsers() {
    return this._hubConnection.invoke('GetAllUsers');
  }

  sendStatus(status) {
    return this._hubConnection.invoke('SendStatus', status);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(environment.BASE_API_URL + 'chat-hub/?token=' + this.tokenService.get().token)
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.startedEvent$.next('Hub connection started');
        this.listenAddUser();
        this.listenUserOnline();
        this.listenUserOffline();
        this.listenUserBusy();
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {

    });
  }

  listenAddUser() {
    this._hubConnection.on('addUser', (data: any) => {
      console.log('addUserEvent', data);
      this.addUserEvent$.next(data);
    });
  }

  listenUserOnline() {
    this._hubConnection.on('userOnline', (data: any) => {
      console.log('userOnline', data);
      this.userOnlineEvent$.next(data);
    });
  }
  listenUserOffline() {
    this._hubConnection.on('userOffline', (data: any) => {
      console.log('userOffline', data);
      this.userOfflineEvent$.next(data);
    });
  }
  listenUserBusy() {
    this._hubConnection.on('userBusy', (data: any) => {
      console.log('userBusy', data);
      this.userBusyEvent$.next(data);
    });
  }
}
