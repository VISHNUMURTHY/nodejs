import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicElementsFormComponent } from './dynamic-elements-form.component';

describe('DynamicElementsFormComponent', () => {
  let component: DynamicElementsFormComponent;
  let fixture: ComponentFixture<DynamicElementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicElementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicElementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
