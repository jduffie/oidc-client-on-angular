import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedTwoComponent } from './protected-two.component';

describe('ProtectedTwoComponent', () => {
  let component: ProtectedTwoComponent;
  let fixture: ComponentFixture<ProtectedTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtectedTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
