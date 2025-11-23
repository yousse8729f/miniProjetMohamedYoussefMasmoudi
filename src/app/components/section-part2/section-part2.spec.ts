import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPart2 } from './section-part2';

describe('SectionPart2', () => {
  let component: SectionPart2;
  let fixture: ComponentFixture<SectionPart2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPart2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPart2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
