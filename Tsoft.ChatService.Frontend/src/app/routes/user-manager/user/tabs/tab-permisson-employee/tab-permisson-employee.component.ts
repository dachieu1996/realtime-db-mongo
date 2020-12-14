import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd';
import { RoleManagerService } from 'src/app/services/user-manager/role-manage/role-manager.service';
import { defaultRequestList } from 'src/app/utils/constant';

@Component({
  selector: 'app-tab-permisson-employee',
  templateUrl: './tab-permisson-employee.component.html',
  styleUrls: ['./tab-permisson-employee.component.less']
})
export class TabPermissonEmployeeComponent implements OnInit {
  @Input('isCheckDisable') isCheckDisable = false;
  @Input('data') data: any[] = [];
  public selectedDataDisplay: any = [];
  testCheckBox = false;

  nodes = [];
  listRole: any[] = [];
  request: any = {
    ...defaultRequestList,
  };
  constructor(private roleService: RoleManagerService) { }

  ngOnInit() {
    this.getListRole();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ischek", this.isCheckDisable);

    this.getListRole();
    if (changes.data) {
      this.selectedDataDisplay = [];
      this.data.forEach(item => {
        this.selectedDataDisplay.push(item.id);
      })
    }

  }
  getListRole() {
    this.roleService.getList(1, 100, '{}').subscribe(res => {
      this.listRole = res.data.content;
    })
  }
  selectItem(checked, data) {

  }

  handleOk(): void {

  }

  handleCancel(): void {

  }
  checkedItem(data: any) {
    let exit = false;
    this.selectedDataDisplay.forEach(element => {
      if (element === data.id) {
        exit = true;
      }

    });
    return exit;
  }
  changeItem(data: any, item) {
    if (data) {
      this.selectedDataDisplay.push(item.id)
    }
  }
  nzOnSearch(e: any): void {
    this.request.currentPage = 1;
    this.request.listTextSearch = e;
    this.request.currentPage = 1;
    this.getListRole();
  }
}
