import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { ListEmployeeComponent } from './user/list-employee/list-employee.component';


const routes: Routes = [
  {
    path: '',
    // component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'connection', pathMatch: 'full' },
      { path: 'employee', component: ListEmployeeComponent },
      { path: 'role', component: ListRoleComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagerRoutingModule { }
