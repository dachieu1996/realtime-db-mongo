import { ComponentsModule } from './../components/components.module';
import { SharedModule } from '@shared';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DetailUserComponent } from './user/detail-user/detail-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';

import { TabRoleInfoComponent } from './role/tabs/tab-role-info/tab-role-info.component';
import { RolePermissionComponent } from './role/tabs/tab-role-permission/tab-role-permission.component';
import { DetailRoleComponent } from './role/detail-role/detail-role.component';
import { CreateEmployeeComponent } from './user/create-employee/create-employee.component';
import { TabInfoEmployeeComponent } from './user/tabs/tab-info-employee/tab-info-employee.component';
import { TabPermissonEmployeeComponent } from './user/tabs/tab-permisson-employee/tab-permisson-employee.component';
import { ListEmployeeComponent } from './user/list-employee/list-employee.component';
import { DetailEmployeeComponent } from './user/detail-employee/detail-employee.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    UserManagerRoutingModule
  ],
  declarations: [
    CreateUserComponent,
    DetailUserComponent,
    EditUserComponent,
    ListRoleComponent,
    CreateRoleComponent,
    RolePermissionComponent,
    TabRoleInfoComponent,
    DetailRoleComponent,
    CreateEmployeeComponent,
    TabInfoEmployeeComponent,
    TabPermissonEmployeeComponent,
    ListEmployeeComponent,
    DetailEmployeeComponent,
  ]
})
export class UserManagerModule { }
