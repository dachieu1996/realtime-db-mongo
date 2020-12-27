/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputPriceComponent } from './input-price.component';

describe('InputPriceComponent', () => {
  let component: InputPriceComponent;
  let fixture: ComponentFixture<InputPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
