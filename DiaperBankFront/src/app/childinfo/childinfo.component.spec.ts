import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildinfoComponent } from './childinfo.component';

describe('ChildinfoComponent', () => {
  let component: ChildinfoComponent;
  let fixture: ComponentFixture<ChildinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
