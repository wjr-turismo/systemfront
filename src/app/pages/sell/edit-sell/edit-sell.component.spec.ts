import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSellComponent } from './edit-sell.component';

describe('EditSellComponent', () => {
  let component: EditSellComponent;
  let fixture: ComponentFixture<EditSellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSellComponent]
    });
    fixture = TestBed.createComponent(EditSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
