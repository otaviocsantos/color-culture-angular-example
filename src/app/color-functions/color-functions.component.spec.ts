import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorFunctionsComponent } from './color-functions.component';

describe('ColorFunctionsComponent', () => {
  let component: ColorFunctionsComponent;
  let fixture: ComponentFixture<ColorFunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorFunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
