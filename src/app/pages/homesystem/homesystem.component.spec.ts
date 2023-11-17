import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomesystemComponent } from './homesystem.component';

describe('HomesystemComponent', () => {
  let component: HomesystemComponent;
  let fixture: ComponentFixture<HomesystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomesystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomesystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
