import { ChatHubService } from './service/chat-hub.service';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { AvailableUserComponent } from './components/available-user/available-user.component';
import { ChatRoutingModule } from './chat-routing.module';
import { DashboardChatComponent } from './dashboard-chat/dashboard-chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ChatRoutingModule
  ],
  declarations: [
    DashboardChatComponent,
    AvailableUserComponent,
    ChatAreaComponent
  ],
  providers: [
    ChatHubService
  ]
})
export class ChatModule { }
