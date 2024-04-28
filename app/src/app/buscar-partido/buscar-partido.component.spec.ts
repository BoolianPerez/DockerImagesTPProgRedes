import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPartidoComponent } from './buscar-partido.component';

describe('BuscarPartidoComponent', () => {
  let component: BuscarPartidoComponent;
  let fixture: ComponentFixture<BuscarPartidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarPartidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarPartidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
