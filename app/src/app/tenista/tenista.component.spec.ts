import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenistaComponent } from './tenista.component';

describe('TenistaComponent', () => {
  let component: TenistaComponent;
  let fixture: ComponentFixture<TenistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenistaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TenistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
