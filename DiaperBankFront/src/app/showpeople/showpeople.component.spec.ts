import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpeopleComponent } from './showpeople.component';

describe('ShowpeopleComponent', () => {
  let component: ShowpeopleComponent;
  let fixture: ComponentFixture<ShowpeopleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowpeopleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
