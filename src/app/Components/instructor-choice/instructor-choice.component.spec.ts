import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorChoiceComponent } from './instructor-choice.component';

describe('InstructorChoiceComponent', () => {
  let component: InstructorChoiceComponent;
  let fixture: ComponentFixture<InstructorChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorChoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
