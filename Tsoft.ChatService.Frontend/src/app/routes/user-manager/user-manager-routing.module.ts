import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { CreateUserComponent } from './user/create-user/create-user.component';
import { ListEmployeeComponent } from './user/list-employee/list-employee.component';


const routes: Routes = [
  {
    path: '',
    // component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'user-managers', pathMatch: 'full' },
      { path: 'employee', component: ListEmployeeComponent },
      { path: 'role', component: ListRoleComponent },
      { path: 'user-managers/create-user', component: CreateUserComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagerRoutingModule { }
