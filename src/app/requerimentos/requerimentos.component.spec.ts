import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimentosComponent } from './requerimentos.component';

describe('RequerimentosComponent', () => {
  let component: RequerimentosComponent;
  let fixture: ComponentFixture<RequerimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequerimentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequerimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
