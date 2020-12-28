import { sendMessageRequestedAction } from './../../store/conversation/conversation.action';
// import { ChatHubService } from './../../service/chat-hub.service';
// import { addMessageToConversationAction } from './../../store/conversation/actions';
// import { AppState } from './../../store/state';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Conversation } from './../../models/conversation';
import { Message } from './../../models/message';
import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.less']
})
export class ChatAreaComponent implements OnInit, AfterViewInit {

  @ViewChild('chatbox', { static: true }) chatbox: ElementRef;
  @Input('selectedConversation') selectedConversation: Conversation;
  @Input('messages') messages: Message[];

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private store: Store,
    // private chatHubService: ChatHubService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('messages', this.messages)
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.scrollToEnd();
  }
  submitMessage(event) {
    const content = event.target.innerHTML;
    // const newMessage: Message = {
    //   content: event.target.innerHTML,
    //   timestamp: new Date(),
    //   senderId: this.myId,
    //   receiverId: this.selectedConversation.receiverId,
    //   conversationId: this.selectedConversation.id
    // }

    this.store.dispatch(sendMessageRequestedAction({ conversation: this.selectedConversation, message: content }));
    // this.chatHubService.sendMessage(newMessage);
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
