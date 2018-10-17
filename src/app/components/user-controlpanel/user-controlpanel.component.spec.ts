import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlpanelComponent } from './user-controlpanel.component';

describe('UserControlpanelComponent', () => {
  let component: UserControlpanelComponent;
  let fixture: ComponentFixture<UserControlpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserControlpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
