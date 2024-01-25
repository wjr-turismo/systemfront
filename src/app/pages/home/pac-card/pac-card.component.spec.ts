import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacCardComponent } from './pac-card.component';

describe('PacCardComponent', () => {
  let component: PacCardComponent;
  let fixture: ComponentFixture<PacCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
