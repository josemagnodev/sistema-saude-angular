import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisPSFComponent } from './locais-psf.component';

describe('LocaisPsfComponent', () => {
  let component: LocaisPSFComponent;
  let fixture: ComponentFixture<LocaisPSFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaisPSFComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaisPSFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
