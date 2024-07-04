import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisProcedimentosComponent } from './locais-procedimentos.component';

describe('LocaisProcedimentosComponent', () => {
  let component: LocaisProcedimentosComponent;
  let fixture: ComponentFixture<LocaisProcedimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocaisProcedimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocaisProcedimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
