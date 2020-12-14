
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModel } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { GroupArray } from 'src/app/helpers';
import { defaultRequestList } from 'src/app/utils/constant';
import { UserRightService } from 'src/app/services';
import { EmployeeManagerService } from '../../../../services/user-manager/employee-manager/employee-manager.service';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.less']
})
export class ListEmployeeComponent implements OnInit {
  // ------GRID INIT------ //
  selectedId: string;
  currentPage = 1;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  request: any = {
    ...defaultRequestList,
  };
  deleteIds: Array<string> = new Array<string>();
  groupBy: any = null;
  total = 0;
  tableType: any = 'true';
  expandable = false;
  numberOfChecked = 0;
  isLoading = false;
  isEdit = false;
  lstData: any[] = [];
  flatData: any[] = [];
  // ------------------------- //

  // ------BUTTON------ //
  btnCreate: ButtonModel;
  btnEdit: ButtonModel;
  btnDelete: ButtonModel;
  // ------------------ //

  // -----MODAL------- //
  visibleCreateModal = false;
  visibleDetailModal = false;
  // ----------------- //
  constructor(
    private router: Router,
    private message: NzMessageService,
    private employeeService: EmployeeManagerService
  ) { }

  ngOnInit() {
    this.fetchListEmployee();
    this.btnCreate = { enable: true, grantAccess: true, i18n: 'layout.btn.create', tittle: 'Thêm mới', visible: true };
    this.btnEdit = { enable: true, grantAccess: true, i18n: 'layout.btn.edit', tittle: 'Cập nhật', visible: true };
    this.btnDelete = { enable: true, grantAccess: true, i18n: 'layout.btn.delete', tittle: 'Xóa', visible: true };
  }

  // ------ INIT ------ //
  initButtonByRightOfUser() {
    // this.btnCreate.grantAccess = this.userRightService.check('TAN-XUAT-CREATE');
    // this.btnEdit.grantAccess = this.userRightService.check('TAN-XUAT-EDIT');
    // this.btnDelete.grantAccess = this.userRightService.check('TAN-XUAT-DELETE');
  }
  // ------------------ //

  // ------FETCH DATA------ //
  async fetchListEmployee() {
    this.isLoading = true;
    this.mapOfCheckedId = {};
    const queryModel = {
      ListTextSearch: this.request.listTextSearch
    };
    const queryString = encodeURIComponent(JSON.stringify(queryModel));

    const response = this.employeeService.getListEmloyee(this.request.currentPage, this.request.pageSize, queryString).subscribe(res => {
      if (res && res.data) {
        this.isLoading = false;
        this.lstData = res.data.result.content;
        this.flatData = res.data.result.content;
        this.total = res.data.totalRecords;
        this.parseGroup(this.flatData);
      } else {
        this.isLoading = false;
        this.message.error(res.message);
      }
    });
  }
  // ---------------------- //

  // ------EVENT------ //
  currentPageDataChange($event: any[]): void {
    this.refreshStatus();
  }

  nzPageIndexChange(currentPage: number): void {
    this.request.currentPage = currentPage;
    this.fetchListEmployee();
  }

  refreshStatus(): void {
    if (this.lstData.length === 0) {
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    } else {
      this.isAllDisplayDataChecked = this.lstData.every(
        item =>
          this.mapOfCheckedId[item.empId] ||
          (item.children && item.children.every((element: { empId: string | number }) => this.mapOfCheckedId[element.empId])),
      );
      this.isIndeterminate =
        this.lstData.some(
          item =>
            this.mapOfCheckedId[item.empId] ||
            (item.children &&
              item.children.some((element: { empId: string | number }) => this.mapOfCheckedId[element.empId])),
        ) && !this.isAllDisplayDataChecked;
    }
    const newdeleteIds = [];
    this.lstData
      .filter(
        item =>
          this.mapOfCheckedId[item.empId] ||
          (item.children && item.children.some((element: { empId: string | number }) => this.mapOfCheckedId[element.empId])),
      )
      .forEach(item => {
        newdeleteIds.push(item.empId);
      });
    this.deleteIds = [...newdeleteIds];
  }

  nzSortChange(e: any): void {
    // this.request.propertyName = e.key;
    // this.request.ascending = e.value;
    const keyOrder = e.value === 'ascend' ? '+' : '-';
    this.request.sort = keyOrder + e.key;
    this.fetchListEmployee();
  }
  ngModelChange(): void {
    this.fetchListEmployee();
  }

  checkAll(value: boolean): void {
    this.lstData.forEach(item => {
      this.mapOfCheckedId[item.empId] = value;
      // tslint:disable-next-line: no-unused-expression
      item.children &&
        item.children.forEach(element => {
          this.mapOfCheckedId[element.empId] = value;
        });
    });
    this.refreshStatus();
  }
  nzOnSearchGroup(e: any): void {
    this.groupBy = e;
    // tslint:disable-next-line: prefer-conditional-expression
    if (e) {
      this.expandable = true;
    } else {
      this.expandable = false;
    }
    this.parseGroup(this.flatData);
  }
  nzOnSearch(e: any): void {
    this.request.currentPage = 1;
    this.request.listTextSearch = e;
    this.fetchListEmployee();
  }
  parseGroup(values: any[]): void {
    // tslint:disable-next-line: prefer-conditional-expression
    if (this.expandable && this.groupBy != null) {
      this.lstData = GroupArray(values, this.groupBy, 'children');
    } else {
      this.lstData = [...values];
    }
  }
  // ----------------- //

  // ------FUNCTIONS------ //
  openCreateModal() {
    this.visibleCreateModal = true;
  }
  openEditModal() {
    this.isEdit = true;
    this.visibleDetailModal = true;
    this.selectedId = this.deleteIds[0];
  }
  openDetailModal() {
    this.visibleDetailModal = true;
  }
  goToDetail(item: { empId: any }) {
    this.isEdit = false;
    this.selectedId = item.empId;
    this.visibleDetailModal = true;
  }

  onUpdated() {
    this.fetchListEmployee();
  }

  onCreated() {
    this.fetchListEmployee();
    this.visibleCreateModal = false;
  }

  deleteMany(): void {
    this.employeeService.deleteManyEmployee(this.deleteIds).subscribe(response => {
      if (response && response.data) {
        this.message.success('Xóa thành công ' + this.deleteIds.length + ' bản ghi');
        this.fetchListEmployee();
      } else {
        this.message.error(response.message);
      }
    });
  }
  reloadGrid() {
    this.fetchListEmployee();
    this.request.searchText = '';
  }
  // ------------------ //

  // ------OTHERS------ //
  // ----------------- //
}
