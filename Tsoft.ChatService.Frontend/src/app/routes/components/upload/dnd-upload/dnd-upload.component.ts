import { Observable, Observer } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dnd-upload',
  templateUrl: './dnd-upload.component.html',
  styleUrls: ['./dnd-upload.component.less']
})
export class DndUploadComponent implements OnInit {
  @Input('multiple') multiple: boolean = false;
  @Output('onChangeFile') onChangeFile: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    this.onChangeFile.emit(event);
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      this.onChangeFile.emit(file);
      // this.imageFile = file;
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      // if (!isJPG) {
      //   this.message.error('You can only upload JPG file!');
      //   observer.complete();
      //   return;
      // }
      // this.getBase64(file, (img: string) => {
      //   this.avatarUrl = img;
      // });
      // this.avatarFile = file;
    });
  };
}
