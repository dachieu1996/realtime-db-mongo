import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-vertical',
  templateUrl: './label-vertical.component.html',
  styleUrls: ['./label-vertical.component.less']
})
export class LabelVerticalComponent implements OnInit {
  @Input('required') required: boolean = false;
  @Input('noColon') noColon: boolean = true;
  @Input('content') content: string;
  @Input('for') for: string;
  constructor() { }

  ngOnInit() {
  }

}
