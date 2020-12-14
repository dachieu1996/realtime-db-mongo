import { NoSpace } from './../../../../helpers/ExtentionMethod';
import { PHONE_NUMBER_REGEX } from './../../../../utils/constant';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent implements OnInit {
  @Input('visible') visible: boolean = false;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  createForm: FormGroup;
  loading = false;
  avatarFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required, NoSpace]],
      userName: [null, [Validators.required, NoSpace]],
      email: [null, [Validators.required, NoSpace]],
      // password: [null, [Validators.required]],
      phoneNumber: [null, [Validators.pattern(PHONE_NUMBER_REGEX)]],
      userDetail: this.formBuilder.group({
        gender: [1],
        address: [null],
        birthdate: [null]
      })
    });
  }

  // --- EVENT --- //
  openModal() {
    this.createForm.reset();
    this.avatarFile = null;
  }

  handleCancel() {
    this.onCancle.emit();
  }

  onChangeImage(file) {
    this.avatarFile = file;
  }

  // --- END EVENT --- //

  // --- FUNCTION --- //
  submit() {
    this.loading = true;
  }
  // --- END FUNCTION --- //

}
