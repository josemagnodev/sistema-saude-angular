import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteRegComponent } from './teste-reg.component';

describe('TesteRegComponent', () => {
  let component: TesteRegComponent;
  let fixture: ComponentFixture<TesteRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesteRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
