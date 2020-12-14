import { Component, EventEmitter, Input, OnInit, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debug } from 'console';
import { truncate } from 'fs';
import { NzMessageService } from 'ng-zorro-antd';
import { AddressManagerService } from 'src/app/services/address-manager/address-manager.service';
import { CustomerManagerService } from 'src/app/services/customer-manager/customer-manager.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Input('visible') visible = false;
  @Input('isEdit') isEdit = true;
  @Input('customerId') customerId: string;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack: EventEmitter<boolean> = new EventEmitter<boolean>();
  editForm: FormGroup;
  loading = false;
  avatarFile: File;
  listCustomer: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private customerManagerService: CustomerManagerService,
    private addressManagerService: AddressManagerService
  ) { }

  async ngOnInit() {
    this.editForm = this.formBuilder.group({
      customerName: [null],
      code: [],
      dob: [null],
      idCard: [null],
      zipcode: [null],
      zipcode2: [null],
      idType: [''],
      address: new FormControl({ value: null, disabled: true }),
      date: [null],
      schoolName: [null],
      address2: new FormControl({ value: null, disabled: true }),
      occupation: [null],
      phone: [null],
      email: [null],
      note: [null],
      status: [true],
      cust_Id: [true],
    });
    this.fetchAddress();
  }

  // --- EVENT --- //
  async openModal() {
    // await this.getDetailRole();
    if (this.isEdit == false) {
      this.editForm.disable();
    }
    else {
      this.editForm.enable();
    }
    this.avatarFile = null;
  }

  ngOnChanges(simple: SimpleChange) {
    if (this.customerId) {
      this.customerManagerService.getCustomerById(this.customerId).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.editForm.patchValue(res.data);
        }

      })
    }
  }

  // async getDetailRole() {
  //   console.log("this.customerId", this.customerId)
  //   if (this.customerId) {
  //     await this.customerManagerService.getCustomerById(this.customerId).toPromise().then(res => {
  //       console.log(res);
  //       if (res.success) {
  //         this.editForm.patchValue(res.data);
  //       }
  //     })
  //   }
  // }

  fetchAddress() {
    // this.addressManagerService.getListAddress().subscribe(res => {
    //   if (res.success) {
    //     if (Array.isArray(res.data) && res.data.length) {
    //       this.listCustomer = [...res.data];
    //       console.log(this.listCustomer);
    //     }
    //   }
    // });
  }

  handleCancel() {
    this.onCancle.emit();
  }
  onEdit() {
    this.isEdit = true;
    this.editForm.enable();
  }

  onChangeImage(file) {
    this.avatarFile = file;
  }

  // --- END EVENT --- //

  // --- FUNCTION --- //
  submit() {
    this.loading = true;
    console.log(this.editForm.controls.customerName.valid);

    if (this.editForm.valid) {

      this.customerManagerService.editCustomer(this.customerId, this.editForm.value).subscribe(res => {
        if (res.success) {
          this.message.success('Cập nhật khách hàng thành công!');
          this.loading = false;
          this.visible = false;
          this.isEdit = true;
          this.callBack.emit(this.isEdit);
        }
      });
    } else {
      this.loading = false;
    }


  }
  // --- END FUNCTION --- //

}
