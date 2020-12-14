import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInfoEmployeeComponent } from './tab-info-employee.component';

describe('TabInfoEmployeeComponent', () => {
  let component: TabInfoEmployeeComponent;
  let fixture: ComponentFixture<TabInfoEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabInfoEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInfoEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
