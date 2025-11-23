import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UNdestination } from './undestination';

describe('UNdestination', () => {
  let component: UNdestination;
  let fixture: ComponentFixture<UNdestination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UNdestination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UNdestination);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
