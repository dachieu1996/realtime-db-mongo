import { NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.less']
})
export class ImageUploadComponent implements OnInit {
  @Input('width') width = 100;
  @Input('height') height;
  @Input('avatarUrl') avatarUrl: string;
  @Input('removeImage') removeImage: boolean = false;
  @Output('onChangeImage') onChangeImage = new EventEmitter<File>();
  imageFile: File;

  constructor(
    private message: NzMessageService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.removeImage) {
      if (this.removeImage) {
        this.avatarUrl = null;
      }
    }
    console.log('this.avatarUrl', this.avatarUrl)
  }

  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      this.imageFile = file;
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
      if (!isJPG) {
        this.message.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      this.getBase64(file, (img: string) => {
        this.avatarUrl = img;
      });
      this.onChangeImage.emit(file);
    });
  };

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }
}
