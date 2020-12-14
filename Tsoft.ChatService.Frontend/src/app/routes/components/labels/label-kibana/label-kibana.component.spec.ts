/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LabelKibanaComponent } from './label-kibana.component';

describe('LabelKibanaComponent', () => {
  let component: LabelKibanaComponent;
  let fixture: ComponentFixture<LabelKibanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelKibanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelKibanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
