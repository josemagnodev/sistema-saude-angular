import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAproveComponent } from './to-aprove.component';

describe('ToAproveComponent', () => {
  let component: ToAproveComponent;
  let fixture: ComponentFixture<ToAproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToAproveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToAproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
