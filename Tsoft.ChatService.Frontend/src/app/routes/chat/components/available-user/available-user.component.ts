import { reorderConversationAction, joinConversationAction } from './../../store/conversation/actions';
import { AppState } from './../../store/state';
import { User } from './../../models/user';
import { Conversation, ConversationType } from './../../models/conversation';
import { DescendingSort } from './../../../../helpers/ExtentionMethod';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { TokenService, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-available-user',
  templateUrl: './available-user.component.html',
  styleUrls: ['./available-user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AvailableUserComponent implements OnInit, OnChanges {
  @Input('loading') loading = true;
  @Input('users') users: User[] = [];
  @Input('conversations') conversations: Conversation[] = [];

  listData: Conversation[] = new Array(10).fill({}).map((_i, index) => {
    return {
      name: 'Demo',
      avatarUrl: '',
      lastMessage:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      if (this.loading == false) {
        this.buildListConversation()
        this.ref.detectChanges();
      }
    }
  }

  formatUrlImage(data) {
    if (data && data != null) {
      return `${environment.BASE_API_URL}${data}`;
    } else {
      return 'assets/images/no-images.png'
    }
  }
  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private ref: ChangeDetectorRef,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {

  }

  // -- EVENTS -- //
  onClickItem(item) {
    this.store.dispatch(joinConversationAction({ conversation: item }));
  }
  // ----------- //


  // -- FUNCIONS -- //
  buildListConversation() {
    let conversations: Conversation[] = [];
    const conversationsTypeGroup: Conversation[] = [];
    const conversationsTypePrivate: Conversation[] = [];
    const conversationsTmp: Conversation[] = []; // Conversation chưa có trong db dùng để tạo tạm cho các user mới
    let userIdsInConversationsTypePrivate: string[] = []; // Dùng để so sánh với các user chưa có conversation

    if (this.conversations) {
      this.conversations.forEach(conversation => {
        if (conversation.type == ConversationType.GROUP) {
          conversationsTypeGroup.push(conversation);
        } else if (conversation.type == ConversationType.PRIVATE) {
          let participants = [...conversation.participants];
          const indexOfMyId = participants.indexOf(this.myId);
          participants.splice(indexOfMyId, 1);
          const receiverId = participants[0];

          let newConversation = { ...conversation };
          newConversation.receiverId = receiverId;

          // Lấy tên, ảnh nếu là group kín
          const receiver = this.users.find(x => x.id == receiverId);
          newConversation.avatarUrl = receiver.avatarUrl;
          newConversation.name = receiver.fullname;


          conversationsTypePrivate.push(newConversation);
          userIdsInConversationsTypePrivate = [...userIdsInConversationsTypePrivate, ...newConversation.participants];
        }
      })
    }

    userIdsInConversationsTypePrivate = [...new Set(userIdsInConversationsTypePrivate)];
    const indexOfMyId = userIdsInConversationsTypePrivate.indexOf(this.myId);
    userIdsInConversationsTypePrivate.splice(indexOfMyId, 1);

    if (this.users) {
      this.users.forEach(user => {
        if (userIdsInConversationsTypePrivate.indexOf(user.id) == -1) {
          const conversationTmp: Conversation = {
            name: user.fullname,
            type: ConversationType.PRIVATE,
            lastMessage: user.fullname + ' đã tham gia.',
            participants: [this.tokenService.get().id, user.id],
            messages: [],
            receiverId: user.id,
            lastActivityTime: user.lastModifiedOnDate,
            avatarUrl: user.avatarUrl
          }
          conversationsTmp.push(conversationTmp);
        }
      })
    }

    conversations = [...conversationsTypeGroup, ...conversationsTypePrivate, ...conversationsTmp];
    conversations = conversations.sort((a, b) => DescendingSort(a.lastActivityTime, b.lastActivityTime));
    this.store.dispatch(reorderConversationAction({ conversations }));
    this.listData = [...conversations];
  }

  get myId() {
    return this.tokenService.get().id;
  }

  getName(item) {
    if (item.fullname)
      return item.fullname;
    if (item.name)
      return item.name;
  }
  // ------------- //
}
