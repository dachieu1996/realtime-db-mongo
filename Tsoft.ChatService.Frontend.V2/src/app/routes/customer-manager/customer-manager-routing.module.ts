import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomerComponent } from './list-customer/list-customer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListCustomerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagerRoutingModule { }
