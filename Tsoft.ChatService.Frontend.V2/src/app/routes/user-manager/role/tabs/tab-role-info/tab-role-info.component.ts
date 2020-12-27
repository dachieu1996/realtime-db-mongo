import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { NoSpace } from 'src/app/helpers';

@Component({
  selector: 'app-tab-role-info',
  templateUrl: './tab-role-info.component.html',
  styleUrls: ['./tab-role-info.component.less']
})
export class TabRoleInfoComponent implements OnInit {
  avatarFile: File;
  public createForm: FormGroup;
  loading = false;
  @Input('data') data: any;

  constructor(
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: [null, [Validators.required, NoSpace]],
      code: [null, [Validators.required, NoSpace]],
      isActive: [true],
      note: [null],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data) {
      if (this.data)
        this.createForm.patchValue(this.data);
    }
  }
  public submitForm() {
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
