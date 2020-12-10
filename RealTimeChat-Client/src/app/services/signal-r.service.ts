import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  // Sự kiện
  createdUserSource = new BehaviorSubject<any>(null);
  createdUser$ = this.createdUserSource.asObservable();
  private hubConnection: signalR.HubConnection

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:44399/chathub')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addUserListener = () => {
    this.hubConnection.on('adduser', (data) => {
      console.log('adduser',data);
      this.updatedUserSelection(data);
    });
  }

  updatedUserSelection(data){
    this.createdUserSource.next(data);
  }
}
