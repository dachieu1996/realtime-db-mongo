import { Component, EventEmitter, Injector, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { UserRegisterComponent } from 'src/app/routes/passport/register/register.component';
import { AppComponentBase } from '@shared';
import { UserManagerService } from 'src/app/services/user-manager/user-manager.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends AppComponentBase implements OnInit {
  @Input('isVisible') isVisible: boolean = true;
  @Input('callSave') callSave: boolean;
  @Output('onCancel') onCancel = new EventEmitter();

  @Output('onSave') onSave = new EventEmitter();
  @Input('userId') userId: string;
  createForm: FormGroup;
  id: string;
  constructor(fb: FormBuilder, private router: Router,
    private userService: UserManagerService,
    injector: Injector, public http: _HttpClient, public msg: NzMessageService) {
    super(injector);
    this.createForm = fb.group({
      password: ['', Validators.required],
      passwordNew: ['', Validators.required],
      confirmPass: ['', Validators.required]

    }, { validator: this.checkIfMatchingPasswords('passwordNew', 'confirmPass') });
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
  ngOnInit() {

  }
  handleSave() {
    for (const i in this.createForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }

    if (this.createForm.valid) {
      this.userService.changePassword(this.userId, { ...this.createForm.value }).subscribe(res => {
        if (res.success) {
          this.msg.success(this.translate('Cập nhật mật khẩu thành công'));
          this.isVisible = false;
          this.onSave.emit();
        } else {
          this.msg.error(this.translate('Cập nhật thất bại'));
        }
      });
    }
  }
  openModal() {
    this.createForm.reset();
  }
  handleCancel() {
    this.onCancel.emit();
  }

}
