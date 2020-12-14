import { FileManagerService } from './../../../../services/file-manager/file-manager.service';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { EmployeeManagerService } from 'src/app/services/user-manager/employee-manager/employee-manager.service';
import { TabInfoEmployeeComponent } from '../tabs/tab-info-employee/tab-info-employee.component'
import { TabPermissonEmployeeComponent } from '../tabs/tab-permisson-employee/tab-permisson-employee.component';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.less']
})
export class CreateEmployeeComponent extends AppComponentBase implements OnInit {
  @Input('visible') visible = false;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  @Output('onCreated') onCreated = new EventEmitter();
  @ViewChild('infoEmployee', { static: false }) infoEmployee: TabInfoEmployeeComponent;
  @ViewChild('permissonEmployee', { static: false }) permissonEmployee: TabPermissonEmployeeComponent;
  loading = false;
  constructor(injector: Injector,
    private employeeManagerService: EmployeeManagerService,
    private message: NzMessageService,
    private fileManagerService: FileManagerService) {
    super(injector);
  }

  ngOnInit() {
  }
  openModal() {
    this.infoEmployee.createForm.reset();
    this.infoEmployee.createForm.controls.isActive.setValue(true);
    this.infoEmployee.createForm.controls.gender.setValue(1);
  }
  handleCancel() {
    this.onCancle.emit();
  }

  async submit() {
    const infoEmployeeForm = this.infoEmployee.submitForm();
    if (!infoEmployeeForm) return;
    const dataPost = {
      username: infoEmployeeForm.username,
      empId: infoEmployeeForm.empId,
      isActive: infoEmployeeForm.isActive,
      fullname: infoEmployeeForm.fullname,
      phone: infoEmployeeForm.phone,
      email: infoEmployeeForm.email,
      note: infoEmployeeForm.note,
      password: infoEmployeeForm.password,
      birthDay: infoEmployeeForm.birthDay,
      gender: infoEmployeeForm.gender,
      avatarUrl: null,
      roleIds: this.permissonEmployee.selectedDataDisplay
    }

    if (this.infoEmployee.avatarFile) {
      const response = await this.fileManagerService.uploadFile(this.infoEmployee.avatarFile).toPromise();
      if (response.success) {
        dataPost.avatarUrl = response.data.directoryName;
      }
      else {
        this.message.error(this.translate('layout.notify.upload.error'));
        return;
      }
    }

    this.employeeManagerService.createEmployee(dataPost).subscribe(res => {
      if (res.success) {
        this.message.success(this.translate('layout.notify.create.sucess'));
        this.onCreated.emit();
      } else {
        this.message.error(this.translate('layout.notify.create.error'));
      }
    });
  }
}
