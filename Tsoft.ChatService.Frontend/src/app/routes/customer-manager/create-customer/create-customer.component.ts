import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { NoSpace } from 'src/app/helpers';
import { AddressManagerService } from 'src/app/services/address-manager/address-manager.service';
import { CustomerManagerService } from 'src/app/services/customer-manager/customer-manager.service';
import { PHONE_NUMBER_REGEX } from 'src/app/utils';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  @Input('visible') visible: boolean = false;
  @Output('onCancel') onCancle = new EventEmitter();
  @Output('callBack') callBack = new EventEmitter();
  createForm: FormGroup;
  loading = false;
  avatarFile: File;
  listCustomer: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService,
    private customerManagerService: CustomerManagerService,
    private addressManagerService: AddressManagerService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      customerName: [null, Validators.required],
      code: [],
      dob: [null, Validators.required],
      idCard: [null],
      zipcode: [null],
      zipcode2: [null],
      idType: [''],
      address: new FormControl({ value: null, disabled: true }),
      date: [null, Validators.required],
      schoolName: [null],
      address2: new FormControl({ value: null, disabled: true }),
      occupation: [null],
      phone: [null],
      email: [null],
      note: [null],
      status: [true],
    });
  }

  // --- EVENT --- //
  openModal() {
    this.createForm.reset();
    this.avatarFile = null;
    this.fetchAddress();
  }

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

  onChangeImage(file) {
    this.avatarFile = file;
  }

  // --- END EVENT --- //

  // --- FUNCTION --- //
  submit() {
    this.loading = true;
    if (this.createForm.valid) {
      this.customerManagerService.createCustomer(this.createForm.value).subscribe(res => {
        if (res.success) {
          this.message.success('Thêm mới khách hàng thành công!');
          this.loading = false;
          this.visible = false;
          this.callBack.emit();
        }
      });
      // this.callBack.emit(this.createForm.value)
    } else {
      this.loading = false;
    }


  }
  // --- END FUNCTION --- //

}
