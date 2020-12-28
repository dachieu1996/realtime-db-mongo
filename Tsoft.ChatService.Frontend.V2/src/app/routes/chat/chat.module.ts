import { messagesReducer } from './store/message/message.reducer';
import { usersReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { ConversationEffects } from './store/conversation/conversation.effect';
import { TokenService } from '@delon/auth';
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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { conversationsReducer } from './store/conversation/conversation.reducer';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    ChatRoutingModule,
    StoreModule.forRoot({
      conversations: conversationsReducer,
      users: usersReducer,
      messages: messagesReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([ConversationEffects, UserEffects]),
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
