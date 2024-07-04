import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaMedicamentoComponent } from './entrega-medicamento.component';

describe('EntregaMedicamentoComponent', () => {
  let component: EntregaMedicamentoComponent;
  let fixture: ComponentFixture<EntregaMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntregaMedicamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntregaMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
