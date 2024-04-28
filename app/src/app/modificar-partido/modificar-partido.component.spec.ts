import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPartidoComponent } from './modificar-partido.component';

describe('ModificarPartidoComponent', () => {
  let component: ModificarPartidoComponent;
  let fixture: ComponentFixture<ModificarPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarPartidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
