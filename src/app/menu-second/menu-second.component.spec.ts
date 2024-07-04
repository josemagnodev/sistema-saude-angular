import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSecondComponent } from './menu-second.component';

describe('MenuSecondComponent', () => {
  let component: MenuSecondComponent;
  let fixture: ComponentFixture<MenuSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuSecondComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
