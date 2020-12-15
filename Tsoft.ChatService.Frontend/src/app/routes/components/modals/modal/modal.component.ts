import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  @Input('title') title: string
  @Input('visible') visible: boolean = false;
  @Input('loading') loading: boolean = false;
  @Input('width') width = 0.7;
  @Input('isEdit') isEdit: boolean = true;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  @Output('openModal') openModal = new EventEmitter();
  @Output('onSave') onSave = new EventEmitter();
  @Output('onEdit') onEdit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get screenWidth() {
    return window.innerWidth * this.width;
  }

  handleOpenModal() {
    this.openModal.emit();
  }

  handleCancel() {
    this.onCancle.emit();
  }

  handleSave() {
    this.onSave.emit();
  }

  handleEdit() {
    this.onEdit.emit();
  }
}
