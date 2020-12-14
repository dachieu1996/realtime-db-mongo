import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModel } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { GroupArray } from 'src/app/helpers';
import { UserRightService } from 'src/app/services';
import { CustomerManagerService } from 'src/app/services/customer-manager/customer-manager.service';
import { defaultRequestList } from 'src/app/utils';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {

  // ------GRID INIT------ //
  isEdit = true;
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
  lstData: any[] = [];
  flatData: any[] = [];
  // ------------------------- //

  // ------BUTTON------ //
  btnCreate: ButtonModel;
  btnEdit: ButtonModel;
  btnDelete: ButtonModel;
  // ------------------ //

  // -----MODAL------- //
  // visibleCreateModal = false;
  visibleCreateModal = false;
  visibleEditModal = false;
  customerIdEdit: string;
  // ----------------- //
  constructor(
    private router: Router,
    private message: NzMessageService,
    private userRightService: UserRightService,
    private customerManagerService: CustomerManagerService
  ) {
    this.btnCreate = { enable: true, grantAccess: true, i18n: 'layout.btn.create', tittle: 'Thêm mới', visible: true };
    this.btnEdit = { enable: true, grantAccess: true, i18n: 'layout.btn.edit', tittle: 'Cập nhật', visible: true };
    this.btnDelete = { enable: true, grantAccess: true, i18n: 'layout.btn.delete', tittle: 'Xóa', visible: true };
  }

  // ------ INIT ------ //
  ngOnInit() {
    this.fetchListCustomer();
    // TODO: tạm bỏ qua vì chưa hoàn thiện chức năng lấy rights
    // this.initButtonByRightOfUser();
  }
  initButtonByRightOfUser() {
    this.btnCreate.grantAccess = this.userRightService.check('TAN-XUAT-CREATE');
    this.btnEdit.grantAccess = this.userRightService.check('TAN-XUAT-EDIT');
    this.btnDelete.grantAccess = this.userRightService.check('TAN-XUAT-DELETE');
  }
  // ------------------ //

  // ------FETCH DATA------ //
  async fetchListCustomer() {
    this.isLoading = true;
    this.deleteIds = [];
    this.isAllDisplayDataChecked = false;
    this.isIndeterminate = false;
    this.mapOfCheckedId = {};
    const queryModel = {
      ListTextSearch: this.request.listTextSearch
    };
    const queryString = encodeURIComponent(JSON.stringify(queryModel));
    const response = await this.customerManagerService
      .getList(this.request.currentPage, this.request.pageSize, this.request.sort, queryString)
      .toPromise();
    if (response && response.data) {
      this.isLoading = false;
      this.lstData = response.data.content;
      this.flatData = response.data.content;
      this.total = response.data.totalRecords;
      this.parseGroup(this.flatData);
    } else {
      this.isLoading = false;
      this.message.error(response.message);
    }
  }
  // ---------------------- //

  // ------EVENT------ //
  currentPageDataChange($event: any[]): void {
    this.refreshStatus();
  }

  nzPageIndexChange(currentPage: number): void {
    this.request.currentPage = currentPage;
    this.fetchListCustomer();
  }

  refreshStatus(): void {
    if (this.lstData.length === 0) {
      this.isAllDisplayDataChecked = false;
      this.isIndeterminate = false;
    } else {
      this.isAllDisplayDataChecked = this.lstData.every(
        item =>
          this.mapOfCheckedId[item.id] ||
          (item.children && item.children.every((element: { id: string | number }) => this.mapOfCheckedId[element.id])),
      );
      this.isIndeterminate =
        this.lstData.some(
          item =>
            this.mapOfCheckedId[item.id] ||
            (item.children &&
              item.children.some((element: { id: string | number }) => this.mapOfCheckedId[element.id])),
        ) && !this.isAllDisplayDataChecked;
    }
    const newdeleteIds = [];
    this.lstData
      .filter(
        item =>
          this.mapOfCheckedId[item.id] ||
          (item.children && item.children.some((element: { id: string | number }) => this.mapOfCheckedId[element.id])),
      )
      .forEach(item => {
        newdeleteIds.push(item.id);
      });
    this.deleteIds = [...newdeleteIds];
  }

  nzSortChange(e: any): void {
    // this.request.propertyName = e.key;
    // this.request.ascending = e.value;
    const keyOrder = e.value === 'ascend' ? '+' : '-';
    this.request.sort = keyOrder + e.key;
    this.fetchListCustomer();
  }
  ngModelChange(): void {
    this.fetchListCustomer();
  }

  checkAll(value: boolean): void {
    this.lstData.forEach(item => {
      this.mapOfCheckedId[item.id] = value;
      // tslint:disable-next-line: no-unused-expression
      item.children &&
        item.children.forEach(element => {
          this.mapOfCheckedId[element.id] = value;
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
    this.parseGroup(this.lstData);
  }
  nzOnSearch(e: any): void {
    this.request.currentPage = 1;
    this.request.listTextSearch = e;
    this.fetchListCustomer();
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



  goToDetail(item: { id: any }) {
    this.visibleEditModal = true;
    this.isEdit = false;
    this.customerIdEdit = item.id;
  }

  goToEdit() {
    this.isEdit = true;
    this.visibleEditModal = true;
    this.customerIdEdit = this.deleteIds[0];
  }

  async callBack(isEdit: boolean) {
    this.isEdit = isEdit;
    this.visibleEditModal = false;
    await this.fetchListCustomer();
  }


  deleteMany(): void {
    this.customerManagerService.deleteCustomer(this.deleteIds).subscribe(response => {
      if (response && response.data) {
        this.message.success('Xóa thành công ' + this.deleteIds.length + ' bản ghi');
        this.fetchListCustomer();
      } else {
        this.message.error(response.message);
      }
    });
  }
  reloadGrid() {
    this.fetchListCustomer();
  }
  // ------------------ //

  // ------OTHERS------ //
  // ----------------- //

}
