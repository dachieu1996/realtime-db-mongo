import { DescendingSort } from './../../../../helpers/ExtentionMethod';
import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
      if (this.users || this.rooms) {
        const sortRooms = this.rooms.sort((r1, r2) => DescendingSort(r1.lastActivityTime, r2.lastActivityTime));
        this.listData = [...sortRooms, ...this.users];
        console.log('333333', this.listData);
        this.ref.detectChanges();
      }
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
