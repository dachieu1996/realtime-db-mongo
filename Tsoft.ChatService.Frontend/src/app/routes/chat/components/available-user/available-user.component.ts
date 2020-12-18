import { DescendingSort } from './../../../../helpers/ExtentionMethod';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-available-user',
  templateUrl: './available-user.component.html',
  styleUrls: ['./available-user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AvailableUserComponent implements OnInit, OnChanges {
  @Input('loading') loading = true;
  @Input('users') users = [];
  @Input('rooms') rooms = [];

  listData = new Array(10).fill({}).map((_i, index) => {
    return {
      name: 'Demo',
      avatarUrl: '',
      lastMessage:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes.users || changes.rooms) {
      console.log('33333333333333333', changes.users);
      if (this.users || this.rooms) {
        const sortRooms = this.rooms.sort((r1, r2) => DescendingSort(r1.lastActivityTime, r2.lastActivityTime));
        this.listData = [...sortRooms, ...this.users];
        console.log("listData", this.listData);

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
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  onClickItem(item) {
    console.log('3333333', item)
  }

  getName(item) {
    if (item.fullname)
      return item.fullname;
    if (item.name)
      return item.name;
  }
}
