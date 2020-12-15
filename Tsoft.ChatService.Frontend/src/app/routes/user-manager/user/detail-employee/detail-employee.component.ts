import { FileManagerService } from './../../../../services/file-manager/file-manager.service';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { EmployeeManagerService } from 'src/app/services/user-manager/employee-manager/employee-manager.service';
import { TabInfoEmployeeComponent } from '../tabs/tab-info-employee/tab-info-employee.component';
import { TabPermissonEmployeeComponent } from '../tabs/tab-permisson-employee/tab-permisson-employee.component';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.less']
})
export class DetailEmployeeComponent extends AppComponentBase implements OnInit {
  @Input('empId') empId: string;
  @Input('visible') visible = false;
  @Input('isEdit') isEdit = false;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  @Output('onUpdated') onUpdated = new EventEmitter();
  @ViewChild('infoEmployee', { static: false }) infoEmployee: TabInfoEmployeeComponent;
  @ViewChild('permissonEmployee', { static: false }) permissonEmployee: TabPermissonEmployeeComponent;
  loading = false;
  dataPost;
  id;
  isCheckDisable = false;
  roleIds: any[] = [];
  constructor(injector: Injector,
    private employeeManagerService: EmployeeManagerService,
    private message: NzMessageService,
    private fileManagerService: FileManagerService
  ) {
    super(injector);
  }

  ngOnInit() {
  }
  openModal() {

    this.getDetailEmployee();
    if (!this.isEdit) {
      this.isCheckDisable = true;
      this.infoEmployee.createForm.disable();
    }
  }
  // ---- EVENT --- //
  handleCancel() {
    this.onCancle.emit();
  }

  onEdit() {
    this.isCheckDisable = false;
    this.isEdit = true;
    this.infoEmployee.createForm.enable();
  }
  getDetailEmployee() {
    this.employeeManagerService.getDetailEmployee(this.empId).subscribe(res => {
      this.id = res.data.id;
      const role: any[] = [];
      res.data.listRole.forEach(item => {
        role.push(item);
      });
      this.roleIds = [...role];
      console.log("role", this.roleIds);

      this.dataPost = res.data;
      this.infoEmployee.createForm.disable();
      this.isCheckDisable = true;
      this.isEdit = false;
    })
  }
  async submit() {
    const employeeInfoForm = this.infoEmployee.submitForm();
    if (!employeeInfoForm) return;

    if (this.infoEmployee.avatarFile) {
      const response = await this.fileManagerService.uploadFile(this.infoEmployee.avatarFile).toPromise();
      if (response.success) {
        employeeInfoForm.avatarUrl = response.data.directoryName;
      }
      else {
        this.message.error(this.translate('layout.notify.upload.error'));
        return;
      }
    }

    this.employeeManagerService.updateEmployee(this.empId, { ...employeeInfoForm, empId: this.empId, id: this.id, roleIds: this.permissonEmployee.selectedDataDisplay }).subscribe(res => {
      if (res.success) {
        this.message.success(this.translate('layout.notify.update.sucess'));
        this.getDetailEmployee();
        this.onUpdated.emit();
      } else {
        this.message.error(this.translate('layout.notify.update.error'));
      }
    });
  }
}
