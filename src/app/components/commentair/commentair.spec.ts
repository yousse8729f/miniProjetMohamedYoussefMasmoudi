import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Commentair } from './commentair';

describe('Commentair', () => {
  let component: Commentair;
  let fixture: ComponentFixture<Commentair>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Commentair]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Commentair);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
