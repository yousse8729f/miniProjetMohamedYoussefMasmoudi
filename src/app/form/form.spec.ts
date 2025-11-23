import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormC } from './form';

describe('Form', () => {
  let component: FormC;
  let fixture: ComponentFixture<FormC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormC],
    }).compileComponents();

    fixture = TestBed.createComponent(FormC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
