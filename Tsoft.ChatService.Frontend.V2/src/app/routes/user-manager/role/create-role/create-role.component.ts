import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RESPONSE_STATUS_CODES } from '@core';
import { AppComponentBase } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { RoleManagerService } from 'src/app/services/user-manager/role-manage/role-manager.service';
import { TabRoleInfoComponent } from '../tabs/tab-role-info/tab-role-info.component';
import { RolePermissionComponent } from '../tabs/tab-role-permission/tab-role-permission.component';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.less']
})
export class CreateRoleComponent extends AppComponentBase implements OnInit {
  @Input('visible') visible = false;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  @Output('onCreated') onCreated = new EventEmitter();

  @ViewChild('roleInfo', { static: false }) roleInfo: TabRoleInfoComponent;
  @ViewChild('rolePermission', { static: false }) rolePermission: RolePermissionComponent;

  loading = false;
  constructor(injector: Injector,
    private roleManageService: RoleManagerService,
    private message: NzMessageService,) {
    super(injector);
  }
  ngOnInit() {
  }

  openModal() {
    this.roleInfo.createForm.reset();
    this.roleInfo.createForm.controls.isActive.setValue(true);
  }

  handleCancel() {
    this.onCancle.emit();
  }
  submit() {
    const dataPost = {
      name: null,
      code: null,
      note: null,
      isActive: null,
      permissionIds: []
    }
    dataPost.name = this.roleInfo.submitForm().name;
    dataPost.code = this.roleInfo.submitForm().name;
    dataPost.note = this.roleInfo.submitForm().note;
    dataPost.isActive = this.roleInfo.submitForm().isActive;
    dataPost.permissionIds = this.rolePermission.permissonIds;
    this.roleManageService.createRole(dataPost).subscribe(res => {
      if (res.success) {
        this.message.success(this.translate('layout.notify.create.sucess'));
        this.onCreated.emit();
      } else {
        this.message.error(this.translate('layout.notify.create.error'));
      }
    });

  }

}
