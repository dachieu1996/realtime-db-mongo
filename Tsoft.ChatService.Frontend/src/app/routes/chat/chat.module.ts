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
    DashboardChatComponent
  ]
})
export class ChatModule { }
