import { ChatHubService } from './../../service/chat-hub.service';
import { addMessageToConversationAction } from './../../store/conversation/actions';
import { AppState } from './../../store/state';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Conversation } from './../../models/conversation';
import { Message } from './../../models/message';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.less']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('chatbox', { static: true }) chatbox: ElementRef;
  @Input('selectedConversation') selectedConversation: Conversation;

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private store: Store<AppState>,
    private chatHubService: ChatHubService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.scrollToEnd();
  }
  submitMessage(event) {
    const newMessage: Message = {
      content: event.target.innerHTML,
      timestamp: new Date(),
      senderId: this.myId,
      receiverId: this.selectedConversation.receiverId,
      conversationId: this.selectedConversation.id
    }

    this.store.dispatch(addMessageToConversationAction({ conversation: this.selectedConversation, message: newMessage }));
    this.chatHubService.sendMessage(newMessage);
    this.chatbox.nativeElement.innerHTML = "";
    this.scrollToEnd();
  }

  scrollToEnd() {
    const objDiv = document.getElementById("message-area");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  get myId() {
    return this.tokenService.get().id;
  }


}
