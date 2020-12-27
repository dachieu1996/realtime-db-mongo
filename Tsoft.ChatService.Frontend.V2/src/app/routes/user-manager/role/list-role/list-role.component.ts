import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModel, AppComponentBase } from '@shared';
import { NzMessageService } from 'ng-zorro-antd';
import { GroupArray } from 'src/app/helpers/ExtentionMethod';
import { defaultRequestList } from 'src/app/utils/constant';
import { RoleManagerService } from './../../../../services/user-manager/role-manage/role-manager.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.less']
})
export class ListRoleComponent extends AppComponentBase implements OnInit {

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
    injector: Injector,
    private router: Router,
    private message: NzMessageService,

    private roleManagerService: RoleManagerService) {
    super(injector);
    this.btnCreate = { enable: true, grantAccess: true, i18n: 'layout.btn.create', tittle: 'Thêm mới', visible: true };
    this.btnEdit = { enable: true, grantAccess: true, i18n: 'layout.btn.edit', tittle: 'Cập nhật', visible: true };
    this.btnDelete = { enable: true, grantAccess: true, i18n: 'layout.btn.delete', tittle: 'Xóa', visible: true };
  }

  ngOnInit() {
    this.fetchListRole();

  }
  initButtonByRightOfUser() {
    // this.btnCreate.grantAccess = this.userRightService.check('TAN-XUAT-CREATE');
    // this.btnEdit.grantAccess = this.userRightService.check('TAN-XUAT-EDIT');
    // this.btnDelete.grantAccess = this.userRightService.check('TAN-XUAT-DELETE');
  }

  // ------FETCH DATA------ //
  async fetchListRole() {
    this.isLoading = true;
    this.mapOfCheckedId = {};
    const queryModel = {
      ListTextSearch: this.request.listTextSearch,
      Sort: this.request.sort
    };
    const queryString = encodeURIComponent(JSON.stringify(queryModel));
    const response = await this.roleManagerService
      .getList(this.request.currentPage, this.request.pageSize, queryString)
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

  currentPageDataChange($event: any[]): void {
    this.refreshStatus();
  }

  nzPageIndexChange(currentPage: number): void {
    this.request.currentPage = currentPage;
    this.fetchListRole();
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
    this.fetchListRole();
  }
  ngModelChange(): void {
    this.fetchListRole();
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
    this.request.searchText = e;
    this.fetchListRole();
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
  goToDetail(item: { id: any }) {
    this.isEdit = false;
    this.selectedId = item.id;
    this.visibleDetailModal = true;
  }

  async onUpdated(isEdit: boolean) {
    this.isEdit = isEdit;
    this.visibleCreateModal = false;
    await this.fetchListRole();
  }

  onCreated() {
    this.fetchListRole();
    this.visibleCreateModal = false;
  }

  deleteMany(): void {
    this.roleManagerService.deleteManyRole(this.deleteIds).subscribe(response => {
      if (response && response.data) {
        this.message.success(this.translate('layout.notify.delete.success') + ' ' + this.deleteIds.length + ' ' + this.translate('layout.notify.delete.message.record'));
        this.fetchListRole();
      } else {
        this.message.error(response.message);
      }
    });
  }
  reloadGrid() {
    this.request.currentPage = 1;
    this.request.pageSize = 20
    this.fetchListRole();
  }
  // ------------------ //

  // ------OTHERS------ //
  // ----------------- //
}
