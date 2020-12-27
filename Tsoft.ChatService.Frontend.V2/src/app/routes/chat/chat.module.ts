import { TokenService } from '@delon/auth';
import { conversationsReducer } from './store/conversation/reducer';
import { environment } from '@env/environment';

import { ChatHubService } from './service/chat-hub.service';
import { ChatAreaComponent } from './components/chat-area/chat-area.component';
import { AvailableUserComponent } from './components/available-user/available-user.component';
import { ChatRoutingModule } from './chat-routing.module';
import { DashboardChatComponent } from './dashboard-chat/dashboard-chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';
import { ComponentsModule } from '../components/components.module';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './store/user/reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ChatRoutingModule,
    StoreModule.forRoot({
      users: usersReducer,
      conversations: conversationsReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
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
