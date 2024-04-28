import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTenistaComponent } from './modificar-tenista.component';

describe('ModificarTenistaComponent', () => {
  let component: ModificarTenistaComponent;
  let fixture: ComponentFixture<ModificarTenistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarTenistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarTenistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
