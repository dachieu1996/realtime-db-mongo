import { NoSpace } from './../../../../helpers/ExtentionMethod';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from './../../../../utils/constant';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, Injector, Inject } from '@angular/core';
import { RESPONSE_STATUS_CODES } from '@core';
import { UserManagerService } from 'src/app/services/user-manager/user-manager.service';
import { AppComponentBase, ButtonModel } from '@shared';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '@env/environment';


@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.less']
})
export class DetailUserComponent extends AppComponentBase implements OnInit {
  @Input('visible') visible: boolean = false;
  @Output('onCancel') onCancle = new EventEmitter();

  editForm: FormGroup;
  loading = false;
  avatarFile: File;
  avatarUrl: string;
  btnSave: ButtonModel;
  id: string;
  isCreateModalVisible: boolean = false;
  constructor(injector: Injector,
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private userService: UserManagerService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    super(injector);
    this.btnSave = { enable: true, grantAccess: true, i18n: 'filenet.archive-type.btn.save', tittle: 'Lưu', visible: true };
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
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
    this.fetchUser();
  }
  fetchUser() {
    this.id = this.tokenService.get().id;
    this.userService.getUserById(this.id).subscribe(res => {
      this.editForm.patchValue(res.data);
      this.avatarUrl = res.data.avatarUrl;
    })
  }
  formatUrlImage(data) {
    if (data && data != null) {
      return `${environment.BASE_API_URL}${data}`;
    } else {
      return 'assets/images/no-images.png'
    }
  }
  onChangeImage(file) {
    this.avatarFile = file;
    this.userService.uploadAFile(file).subscribe(res => {
      this.avatarUrl = res.dbPath;
    });
  }
  openCreateModal() {
    this.isCreateModalVisible = true;
  }
  callBackChangePassword() {
    this.isCreateModalVisible = false;
  }
  onCancelModel() {
    this.isCreateModalVisible = false;
  }
  submit() {
    for (const i in this.editForm.controls) {
      this.editForm.controls[i].markAsDirty();
      this.editForm.controls[i].updateValueAndValidity();
    }
    if (this.editForm.valid) {
      this.userService.updateUser(this.id, { ...this.editForm.value, avatarUrl: this.avatarUrl }).subscribe(res => {
        if (res.success) {
          this.message.success(this.translate('layout.notify.update.sucess'));

        } else {
          this.message.error(this.translate('layout.notify.create.error'));
        }
      });
    }
  }
}
