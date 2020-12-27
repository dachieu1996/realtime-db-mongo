import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPermissonEmployeeComponent } from './tab-permisson-employee.component';

describe('TabPermissonEmployeeComponent', () => {
  let component: TabPermissonEmployeeComponent;
  let fixture: ComponentFixture<TabPermissonEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPermissonEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPermissonEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
