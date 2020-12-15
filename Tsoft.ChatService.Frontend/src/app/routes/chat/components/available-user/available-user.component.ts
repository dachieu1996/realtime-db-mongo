import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-user',
  templateUrl: './available-user.component.html',
  styleUrls: ['./available-user.component.less']
})
export class AvailableUserComponent implements OnInit {

  loading = false;
  listData = new Array(100).fill({}).map((_i, index) => {
    return {
      href: 'http://ng.ant.design',
      title: `ant design part ${index}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources ' +
        '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    };
  });

  constructor() { }

  ngOnInit() {
  }

  onClickItem(event) {
  }

}
