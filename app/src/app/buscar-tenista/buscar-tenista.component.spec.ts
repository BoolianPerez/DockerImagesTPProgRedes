import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTenistaComponent } from './buscar-tenista.component';

describe('BuscarTenistaComponent', () => {
  let component: BuscarTenistaComponent;
  let fixture: ComponentFixture<BuscarTenistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarTenistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarTenistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
