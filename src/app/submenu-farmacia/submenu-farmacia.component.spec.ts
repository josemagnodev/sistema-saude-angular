import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuFarmaciaComponent } from './submenu-farmacia.component';

describe('SubmenuFarmaciaComponent', () => {
  let component: SubmenuFarmaciaComponent;
  let fixture: ComponentFixture<SubmenuFarmaciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmenuFarmaciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
