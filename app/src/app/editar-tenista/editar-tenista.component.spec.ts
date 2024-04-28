import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTenistaComponent } from './editar-tenista.component';

describe('EditarTenistaComponent', () => {
  let component: EditarTenistaComponent;
  let fixture: ComponentFixture<EditarTenistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTenistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTenistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
