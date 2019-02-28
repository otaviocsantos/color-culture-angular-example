import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPickerComponent } from './mini-picker.component';

describe('MiniPickerComponent', () => {
  let component: MiniPickerComponent;
  let fixture: ComponentFixture<MiniPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
