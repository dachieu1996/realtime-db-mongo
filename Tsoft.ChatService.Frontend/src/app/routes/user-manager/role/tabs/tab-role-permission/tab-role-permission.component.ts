import { AppComponentBase } from '@shared';
import { Component, Input, OnInit, SimpleChanges, ViewChild, Injector } from '@angular/core';
import { NzFormatEmitEvent, NzTreeComponent } from 'ng-zorro-antd';
import { DateRangePopupComponent } from 'ng-zorro-antd/date-picker/lib/popups/date-range-popup.component';
import { RoleManagerService } from 'src/app/services/user-manager/role-manage/role-manager.service';
import { defaultRequestList } from 'src/app/utils';

@Component({
  selector: 'app-tab-role-permission',
  templateUrl: './tab-role-permission.component.html',
  styleUrls: ['./tab-role-permission.component.less']
})
export class RolePermissionComponent extends AppComponentBase implements OnInit {
  @Input('data') data: any[] = [];

  @ViewChild('tree', { static: false }) tree: NzTreeComponent;
  nodes = [];


  listRole: any[];
  request: any = {
    ...defaultRequestList,
  };
  listPermissonSelected: any[] = [];
  public permissonIds: any[] = [];

  constructor(injector: Injector, private roleService: RoleManagerService) {
    super(injector);
  }

  ngOnInit() {
    this.getListRole();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.listPermissonSelected = [];
      this.data.forEach(item => {
        this.listPermissonSelected.push(item.id);
      })
    }

    // this.listPerssion =
    // console.log("list", this.listPermisson);
  }
  async getListRole() {
    await this.roleService.getListRole().toPromise().then(res => {
      this.listRole = res.data;
      const nodeFormat: any[] = [];
      const result = this.listRole.reduce((r, a) => {
        r[a.prefix] = r[a.prefix] || [];
        r[a.prefix].push(a);
        // r.key = a.key
        return r;
      }, Object.create(null));
      // tslint:disable-next-line: forin
      for (const key in result) {
        const childrenData: any[] = [];

        const dataNode = {
          key: key,
          title: this.translate('user-manager.permission.prefix.' + key),
          children: [],
        }

        result[key].forEach(item1 => {
          const dataChildren = {
            title: null,
            key: null,
            isLeaf: true,
          }
          dataChildren.key = item1.id;
          dataChildren.title = this.translate('user-manager.permission.' + item1.key);
          dataChildren.isLeaf = true;
          childrenData.push(dataChildren);
        });
        dataNode.children = [...childrenData];
        nodeFormat.push(dataNode);
      }
      this.nodes = [...nodeFormat];
      this.listPermissonSelected = [...this.listPermissonSelected];
    })
  }
  public nzEvent(event: NzFormatEmitEvent) {
    this.permissonIds = [];
    event.checkedKeys.forEach(node => {
      if (node.level == 0) {
        this.permissonIds = [
          ...this.permissonIds,
          ...this.listRole.filter(x => x.prefix == node.key).map(x => x.id)
        ]
      } else if (node.level == 1) {
        this.permissonIds.push(node.key)
      }
    });
  }
  nzOnSearch(e: any): void {
    this.request.currentPage = 1;
    this.request.listTextSearch = e;
    this.request.currentPage = 1;
    this.getListRole();
  }

  async enableNode() {
    await this.getListRole();
    this.nodes.forEach(item => {
      item.disabled = false;
      item.children.forEach(item1 => {
        item1.disabled = false;
      });
    });
  }
  async disableNode() {
    await this.getListRole();
    this.nodes.forEach(item => {
      item.disabled = true;
      item.children.forEach(item1 => {
        item1.disabled = true;
      });
    });
  }
}
