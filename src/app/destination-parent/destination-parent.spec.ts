import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationParent } from './destination-parent';

describe('DestinationParent', () => {
  let component: DestinationParent;
  let fixture: ComponentFixture<DestinationParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationParent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationParent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
