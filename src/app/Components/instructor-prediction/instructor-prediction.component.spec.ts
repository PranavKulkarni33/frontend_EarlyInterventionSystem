import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPredictionComponent } from './instructor-prediction.component';

describe('InstructorPredictionComponent', () => {
  let component: InstructorPredictionComponent;
  let fixture: ComponentFixture<InstructorPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorPredictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
