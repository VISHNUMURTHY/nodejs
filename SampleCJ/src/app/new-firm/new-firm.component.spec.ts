import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFirmComponent } from './new-firm.component';

describe('NewFirmComponent', () => {
  let component: NewFirmComponent;
  let fixture: ComponentFixture<NewFirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
