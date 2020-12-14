import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerManagerRoutingModule } from './customer-manager-routing.module';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    CustomerManagerRoutingModule
  ],
  declarations: [
    ListCustomerComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    DetailCustomerComponent
  ]
})
export class CustomerManagerModule { }
