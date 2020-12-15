import { environment } from '@env/environment';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { NoSpace } from 'src/app/helpers';
import { PHONE_NUMBER_REGEX } from 'src/app/utils/constant';


@Component({
  selector: 'app-tab-info-employee',
  templateUrl: './tab-info-employee.component.html',
  styleUrls: ['./tab-info-employee.component.less']
})
export class TabInfoEmployeeComponent implements OnInit {
  createForm: FormGroup;
  loading = false;
  avatarFile: File;
  avatarUrl: string;
  @Input('data') data: any;
  @Input('isDetail') isDetail = false;
  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      username: [null, [Validators.required, NoSpace]],
      isActive: [true],
      fullname: [null, [Validators.required, NoSpace]],
      phone: [null],
      email: [null, [Validators.required, NoSpace]],
      note: [null],
      password: [null, [Validators.required, NoSpace]],
      birthDay: [null],
      gender: [1],
    })
    if (this.isDetail) {
      this.createForm.controls.password.setValidators([]);
      this.createForm.controls.password.disable();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      if (this.data) {
        this.createForm.patchValue(this.data);
        this.avatarUrl = null;
        if (this.data.avatarUrl) {
          this.avatarUrl = environment.BASE_API_URL + this.data.avatarUrl;
        }
      }
    }
  }
  onChangeImage(file) {
    this.avatarFile = file;
  }
  public submitForm() {
    if (this.createForm.value.phone) {
      this.createForm.controls.phone.setValidators([Validators.pattern(PHONE_NUMBER_REGEX), NoSpace]);
    } else {
      this.createForm.controls.phone.setValidators([]);
    }
    for (const i in this.createForm.controls) {
      this.createForm.controls[i].markAsDirty();
      this.createForm.controls[i].updateValueAndValidity();
    }
    if (this.createForm.valid) {
      return this.createForm.value;

    }
    else
      return null;
  }
}
