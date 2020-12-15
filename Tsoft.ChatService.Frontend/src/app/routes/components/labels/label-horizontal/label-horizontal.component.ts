import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-horizontal',
  templateUrl: './label-horizontal.component.html',
  styleUrls: ['./label-horizontal.component.less']
})
export class LabelHorizontalComponent implements OnInit {
  @Input('required') required: boolean = false;
  @Input('noColon') noColon: boolean = false;
  @Input('for') for: string;
  @Input('span') span: string = "8";
  @Input('classLabel') classLabel: string;
  @Input('content') content: string;

  constructor() { }

  ngOnInit() {
  }

}
