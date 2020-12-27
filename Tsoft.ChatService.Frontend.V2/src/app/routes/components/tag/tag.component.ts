import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
type ModeTag = 'closeable' | 'default' | 'checkable';
type Color = 'active' | 'inActive' | 'link' | 'linkExpired' | 'emptyPackage' | 'newPackage' | 'fulledPackage' | 'drafting' | 'processing' | 'processed';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.less']
})
export class TagComponent implements OnInit {
  @Input('color') color: Color;
  @Input('mode') mode: ModeTag = 'default';
  @Input('isChecked') isChecked: boolean = false;
  @Input('hasBorderRadius') hasBorderRadius: boolean = false;
  @Input('tagClass') tagClass: string;
  @Input('isClickable') isClickable: boolean = false;

  @Output('onClose') onClose = new EventEmitter<MouseEvent>();
  @Output('onCheckedChange') onCheckedChange = new EventEmitter<boolean>();
  colorCode: string;

  constructor() { }

  ngOnInit() {
    switch (this.color) {
      case 'active':
        this.colorCode = '#36c6d3';
        break;
      case 'inActive':
        this.colorCode = '#f1c40f';
        break;
      case 'link':
        this.colorCode = 'green';
        break;
      case 'linkExpired':
        this.colorCode = 'red';
        break;
      case 'emptyPackage':
        this.colorCode = '#36c6d3';
        break;
      case 'newPackage':
        this.colorCode = '#CDCDCD';
        break;
      case 'fulledPackage':
        this.colorCode = '#f1c40f';
        break;
      case 'drafting':
        this.colorCode = '#CDCDCD';
        break;
      case 'processing':
        this.colorCode = '#f1c40f';
        break;
      case 'processed':
        this.colorCode = '#36c6d3';
        break;
      default:
        this.colorCode = 'default';
        break;
    }
  }

  handleOnClose(event: MouseEvent) {
    this.onClose.emit(event);
  }

  handleCheckedChange(event: boolean) {
    this.onCheckedChange.emit(event);
  }

}
