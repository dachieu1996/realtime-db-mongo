import { tap } from 'rxjs/operators';
import { selectSelectedConversation } from './../../store/conversation/conversation.selector';
import { upsertManyConversationsAction, selectConversationAction, messagesRequestedAction } from './../../store/conversation/conversation.action';
import { User } from './../../models/user';
import { Conversation, ConversationType } from './../../models/conversation';
import { DescendingDatetimeSort } from './../../../../helpers/ExtentionMethod';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { TokenService, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Store, select } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Dictionary } from '@ngrx/entity';

@Component({
  selector: 'app-available-user',
  templateUrl: './available-user.component.html',
  styleUrls: ['./available-user.component.less']

})
export class AvailableUserComponent implements OnInit, OnChanges {
  @Input('conversationLoading') conversationLoading;
  @Input('userLoading') userLoading;

  @Input('users') users: User[] = [];
  @Input('conversations') conversations: Conversation[] = [];

  loading: boolean = true;

  listData: Conversation[] = new Array(10).fill({}).map((_i, index) => {
    return {
      id: 'Demo',
      name: 'Demo',
      avatarUrl: '',
      lastMessage:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });
  firstLoad: boolean = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.conversationLoading || changes.userLoading) {
      this.loading = this.conversationLoading || this.userLoading
      if (this.loading == false && this.firstLoad) {
        this.buildListData();
        this.firstLoad = false;
      }
      // if (this.loading == false) {
      //   this.listData = [...this.conversations]
      //   // this.buildListConversation()
      //   // this.ref.detectChanges();
      // }
    }
    if (changes.conversations) {
      this.listData = [...this.conversations];
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
    private store: Store,
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(selectSelectedConversation),
      tap(selectedConversation => {
        if (selectedConversation)
          this.store.dispatch(messagesRequestedAction({ conversationId: selectedConversation.id, offset: 0, size: 1000 }))
      })
    ).subscribe();

  }

  // -- EVENTS -- //
  onClickItem(item: Conversation) {
    this.store.dispatch(selectConversationAction({ selectedConversationId: item.id }));
    // this.store.dispatch(messagesRequestedAction({ conversationId: item.id, offset: 0, size: 1000 }))
  }
  // ----------- //


  // -- FUNCIONS -- //
  buildListData() {
    // Lấy tất cả conversation type private và các user id trong các conversation đó
    const conversationsTypePrivate: Conversation[] = this.conversations.filter(x => x.type == ConversationType.PRIVATE);
    const dictUserConversation: { [key: string]: Conversation } = {};
    conversationsTypePrivate.forEach(conversation => {
      conversation.participants.filter(userId => userId != this.myId).forEach(userId => {
        dictUserConversation[userId] = conversation;
      })
    })

    // Check nếu user chưa có trong bất kì conversation nào thì tạo conversation mới (Lưu ở client trc, khi nào chat thì mới lưu phía server)
    const upsertConversations: Conversation[] = [];
    this.users.filter(user => user.id != this.myId).forEach(user => {
      if (!dictUserConversation.hasOwnProperty(user.id)) {
        upsertConversations.push({
          id: Guid.create().toString(),
          name: user.fullname,
          lastMessage: user.fullname + ' đã tham gia.',
          type: ConversationType.PRIVATE,
          avatarUrl: user.avatarUrl,
          lastActivityTime: user.createdOnDate,
          participants: [this.tokenService.get().id, user.id],
          status: user.status
        })
      } else {
        let conversation = { ...dictUserConversation[user.id] };
        conversation.avatarUrl = user.avatarUrl;
        conversation.name = user.fullname;
        upsertConversations.push(conversation);
      }
    })

    console.log('upsertConversations', upsertConversations)

    this.store.dispatch(upsertManyConversationsAction({ conversations: upsertConversations }));
  }

  // buildListConversation() {
  //   let conversations: Conversation[] = [];
  //   const conversationsTypeGroup: Conversation[] = [];
  //   const conversationsTypePrivate: Conversation[] = [];
  //   const conversationsTmp: Conversation[] = []; // Conversation chưa có trong db dùng để tạo tạm cho các user mới
  //   let userIdsInConversationsTypePrivate: string[] = []; // Dùng để so sánh với các user chưa có conversation

  //   if (this.conversations) {
  //     this.conversations.forEach(conversation => {
  //       if (conversation.type == ConversationType.GROUP) {
  //         conversationsTypeGroup.push(conversation);
  //       } else if (conversation.type == ConversationType.PRIVATE) {
  //         let participants = [...conversation.participants];
  //         const indexOfMyId = participants.indexOf(this.myId);
  //         participants.splice(indexOfMyId, 1);
  //         const receiverId = participants[0];

  //         let newConversation = { ...conversation };
  //         newConversation.receiverId = receiverId;

  //         // Lấy tên, ảnh nếu là group kín
  //         const receiver = this.users.find(x => x.id == receiverId);
  //         newConversation.avatarUrl = receiver.avatarUrl;
  //         newConversation.name = receiver.fullname;


  //         conversationsTypePrivate.push(newConversation);
  //         userIdsInConversationsTypePrivate = [...userIdsInConversationsTypePrivate, ...newConversation.participants];
  //       }
  //     })
  //   }

  //   userIdsInConversationsTypePrivate = [...new Set(userIdsInConversationsTypePrivate)];
  //   const indexOfMyId = userIdsInConversationsTypePrivate.indexOf(this.myId);
  //   userIdsInConversationsTypePrivate.splice(indexOfMyId, 1);

  //   if (this.users) {
  //     this.users.forEach(user => {
  //       if (userIdsInConversationsTypePrivate.indexOf(user.id) == -1) {
  //         const conversationTmp: Conversation = {
  //           name: user.fullname,
  //           type: ConversationType.PRIVATE,
  //           lastMessage: user.fullname + ' đã tham gia.',
  //           participants: [this.tokenService.get().id, user.id],
  //           // messages: [],
  //           receiverId: user.id,
  //           lastActivityTime: user.lastModifiedOnDate,
  //           avatarUrl: user.avatarUrl
  //         }
  //         conversationsTmp.push(conversationTmp);
  //       }
  //     })
  //   }

  //   conversations = [...conversationsTypeGroup, ...conversationsTypePrivate, ...conversationsTmp];
  //   conversations = conversations.sort((a, b) => DescendingDatetimeSort(a.lastActivityTime, b.lastActivityTime));

  //   this.listData = [...conversations];
  // }

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
