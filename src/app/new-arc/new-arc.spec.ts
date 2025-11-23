import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArc } from './new-arc';

describe('NewArc', () => {
  let component: NewArc;
  let fixture: ComponentFixture<NewArc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewArc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
