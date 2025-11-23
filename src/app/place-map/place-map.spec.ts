import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceMap } from './place-map';

describe('PlaceMap', () => {
  let component: PlaceMap;
  let fixture: ComponentFixture<PlaceMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
