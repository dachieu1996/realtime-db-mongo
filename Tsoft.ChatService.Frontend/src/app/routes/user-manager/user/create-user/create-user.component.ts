import { NoSpace } from './../../../../helpers/ExtentionMethod';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from './../../../../utils/constant';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Injector } from '@angular/core';
import { RESPONSE_STATUS_CODES } from '@core';
import { UserManagerService } from 'src/app/services/user-manager/user-manager.service';
import { AppComponentBase, ButtonModel } from '@shared';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.less']
})
export class CreateUserComponent extends AppComponentBase implements OnInit {
  @Input('visible') visible: boolean = false;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  createForm: FormGroup;
  loading = false;
  avatarFile: File;
  btnSave: ButtonModel;
  btnClose: ButtonModel;
  constructor(injector: Injector,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private userService: UserManagerService
  ) {
    super(injector);
    this.btnSave = { enable: true, grantAccess: true, i18n: 'filenet.archive-type.btn.save', tittle: 'Lưu', visible: true };
    this.btnClose = { enable: true, grantAccess: true, i18n: 'filenet.archive-type.btn.close', tittle: 'Hủy bỏ', visible: true };
  }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      fullname: [null, [Validators.required, NoSpace]],
      username: [null, [Validators.required, NoSpace]],
      email: [null, [Validators.pattern(EMAIL_REGEX)]],
      password: [null, [Validators.required]],
      phoneNumber: [null, [Validators.pattern(PHONE_NUMBER_REGEX)]],
      userDetail: this.formBuilder.group({
        gender: [1],
        address: [null],
        birthdate: [null]
      })
    });
  }

  // --- EVENT --- //
  // openModal() {
  //   this.createForm.reset();
  //   this.avatarFile = null;
  // }

  handleCancel() {
    this.onCancle.emit();
  }

  onChangeImage(file) {
    this.avatarFile = file;
  }

  // --- END EVENT --- //

  // --- FUNCTION --- //
  submit() {
    for (const i in this.createForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }
    if (this.createForm.valid) {
      this.userService.createUser({ ...this.createForm.value }).subscribe(res => {
        if (res.success) {
          this.message.success(this.translate('layout.notify.create.sucess'));

        } else {
          this.message.error(this.translate('layout.notify.create.error'));
        }
      });
    }
  }
  // --- END FUNCTION --- //

}
