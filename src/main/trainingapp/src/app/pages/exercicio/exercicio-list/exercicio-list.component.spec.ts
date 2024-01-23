import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicioListComponent } from './exercicio-list.component';

describe('ExercicioListComponent', () => {
  let component: ExercicioListComponent;
  let fixture: ComponentFixture<ExercicioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercicioListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercicioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
