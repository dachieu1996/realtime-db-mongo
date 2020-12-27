import { AppComponentBase } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { RolePermissionComponent } from '../tabs/tab-role-permission/tab-role-permission.component';
import { TabRoleInfoComponent } from '../tabs/tab-role-info/tab-role-info.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoleManagerService } from 'src/app/services/user-manager/role-manage/role-manager.service';

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.less']
})
export class DetailRoleComponent extends AppComponentBase implements OnInit {
  // tslint:disable-next-line: no-output-rename
  @Input('id') id: string;
  @Input('visible') visible = false;
  @Input('isEdit') isEdit = false;
  @Output('onCancel') onCancel = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  @Output('onUpdated') onUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('roleInfo', { static: false }) roleInfo: TabRoleInfoComponent;
  @ViewChild('rolePermission', { static: false }) rolePermission: RolePermissionComponent;
  loading = false;
  dataPost;

  permissonIds: any[] = [];
  constructor(injector: Injector,
    private roleManageService: RoleManagerService,
    private message: NzMessageService,
    private route: ActivatedRoute,) {
    super(injector);
  }

  ngOnInit() {
  }


  openModal() {
    this.getDetailRole();
    if (!this.isEdit) {
      this.roleInfo.createForm.disable();
      this.rolePermission.disableNode();
    } else {
      this.roleInfo.createForm.enable();
      this.rolePermission.enableNode();
    }
  }

  // ---- EVENT --- //
  handleCancel() {
    this.onCancel.emit();
    //  this.isEdit = true;
    // this.roleInfo.createForm.disable();
  }

  onEdit() {
    this.isEdit = true;
    this.roleInfo.createForm.enable();
    this.rolePermission.enableNode();
  }

  // -------------- //
  getDetailRole() {
    this.roleManageService.getDetailRole(this.id).toPromise().then(res => {
      const dataPost: any = {};
      const permisson: any[] = [];
      dataPost.name = res.data.name;
      dataPost.code = res.data.code;
      dataPost.isActive = res.data.isActive;
      dataPost.note = res.data.note;
      res.data.permissons.forEach(item => {
        permisson.push(item);
      });
      this.permissonIds = [...permisson];
      this.dataPost = dataPost;
    })
  }

  get title() {
    if (this.isEdit)
      return this.translate('user-manager.role.edit.title');
    else
      return this.translate('user-manager.role.detail.title');
  }

  submit() {
    const roleInfoForm = this.roleInfo.submitForm();
    if (!roleInfoForm) return;
    const dataPost = {
      id: this.id,
      name: roleInfoForm.name,
      code: roleInfoForm.code,
      note: roleInfoForm.note,
      isActive: roleInfoForm.isActive,
      permissionIds: this.rolePermission.permissonIds
    }

    this.roleManageService.updateRole(this.id, dataPost).subscribe(res => {
      if (res.success) {
        this.message.success(this.translate('layout.notify.update.sucess'));
        this.getDetailRole();
        this.roleInfo.createForm.disable();
        this.rolePermission.disableNode();
        this.isEdit = false;
        this.onUpdated.emit(this.isEdit);
      } else {
        this.message.error(this.translate('layout.notify.update.error'));
      }
    });
  }
}
