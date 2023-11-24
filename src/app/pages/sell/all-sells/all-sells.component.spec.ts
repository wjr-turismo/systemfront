import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSellsComponent } from './all-sells.component';

describe('AllSellsComponent', () => {
  let component: AllSellsComponent;
  let fixture: ComponentFixture<AllSellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSellsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
