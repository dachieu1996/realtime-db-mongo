import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { NoticeItem, NoticeIconList } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { noticeRouter } from 'src/app/utils';
import { SignalRService } from 'src/app/services';

/**
 * 菜单通知
 */
@Component({
  selector: 'layout-pro-notify',
  templateUrl: './notify.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutProWidgetNotifyComponent implements OnInit {
  data: NoticeItem[] = [
    // {
    //   title: 'Thông báo chung',
    //   list: [],
    //   emptyText: 'Bạn đã xem tất cả các thông báo',
    //   emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
    //   clearText: 'Đánh dấu tất cả là đã đọc',
    // },
    {
      title: 'Công việc cần xử lý',
      list: [],
      emptyText: 'Bạn đã hoàn thành tất cả công việc',
      emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
      clearText: 'Đánh dấu tất cả là đã đọc',
    },
    // {
    //   title: 'Công việc',
    //   list: [],
    //   emptyText: 'Bạn đã hoàn thành tất cả công việc',
    //   emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
    //   clearText: 'Xóa danh sách',
    // },
  ];
  count = 0;
  loading = false;
  lstNotices: Array<NoticeIconList> = new Array<NoticeIconList>();
  constructor(
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private httpClient: _HttpClient,
    private signalRService: SignalRService,
    private notification: NzNotificationService,
  ) {}
  ngOnInit(): void {
    // this.loadData();
    // this.signalRService.signalReceived.subscribe(() => {
    //   setTimeout(() => {
    //     this.loadData();
    //     this.notification.info('Bạn có thông báo chưa đọc', 'Vui lòng mở hộp thư để kiểm tra thông báo.', {
    //       nzAnimate: true,
    //     });
    //   }, 1000);
    // });
  }

  updateNoticeData(notices: NoticeIconList[]): NoticeItem[] {
    const data = this.data.slice();
    data.forEach(i => (i.list = []));

    notices.forEach(item => {
      const newItem = { ...item };
      if (newItem.datetime)
        // newItem.datetime = distanceInWordsToNow(item.datetime, {
        //   locale: (window as any).__locale__,
        // });
        newItem.datetime = distanceInWordsToNow(item.datetime);
      if (newItem.extra && newItem.status) {
        newItem.color = {
          todo: undefined,
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newItem.status];
      }
      data.find(w => w.title === newItem.type).list.push(newItem);
    });
    return data;
  }

  loadData() {
    if (this.loading) return;
    this.loading = true;
    // Lấy danh sách thông báo theo user
    this.getNoticeByUser().subscribe(response => {
      if (response.code === 200) {
        if (response.data !== null && response.data.length > 0) {
          this.count = response.data.filter((sp: { isRead: boolean }) => sp.isRead === false).length;
          // Map data
          this.lstNotices = new Array<NoticeIconList>();
          response.data.forEach((noticeByUser: any) => {
            const newNotice: NoticeIconList = {
              id: noticeByUser.id,
              avatar: '',
              title: noticeByUser.title,
              datetime: noticeByUser.createdOnDate,
              read: noticeByUser.isRead,
              description: noticeByUser.description,
              type: 'Công việc cần xử lý',
              link: noticeByUser.link,
            };
            this.lstNotices.push(newNotice);
          });
          setTimeout(() => {
            this.data = this.updateNoticeData(this.lstNotices);
            this.loading = false;
            this.cdr.detectChanges();
          }, 1000);
        } else {
          this.loading = false;
        }
      } else {
        this.msg.error(response.message);
      }
    });
  }

  clear(type: string) {
    this.markReadByUser('00000000-0000-0000-0000-000000000000').subscribe(response => {
      if (response.code === 200) {
        this.loadData();
        this.msg.success('Đánh dấu tất cả thông báo là đã đọc');
      }
    });
  }

  select(res: any) {
    this.msg.success(`Đang di chuyển đến mà hình chi tiết`);
    this.markReadByUser(res.item.id).subscribe(response => {
      if (response.code === 200) {
        this.loadData();
        window.location.href = res.item.link;
      }
    });
  }

  getNoticeByUser() {
    return this.httpClient.get(environment.BASE_API_URL + noticeRouter.getAllNoticeByUser);
  }

  markReadByUser(noticeId: string) {
    return this.httpClient.put(
      environment.BASE_API_URL + noticeRouter.markAsReadNoticeByUser + '?noticeId=' + noticeId,
    );
  }
}
