import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { InstructorService } from 'src/app/Services/instructor.service';
import { ModelMetadata } from 'src/app/Interfaces/model-metadata';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  models: any[] = [];
  selectedModel: any = null;

  individualInputs: { [key: string]: any } = {};
  individualComment: string = '';
  individualResult: any = null;

  objectKeys = Object.keys;
  scoreOptions: number[] = Array.from({ length: 101 }, (_, i) => i);


  constructor(
    private instructorService: InstructorService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.instructorService.getAllModels().subscribe({
      next: (response: any) => {
        this.models = (Object.entries(response) as [string, ModelMetadata][]).map(
          ([course, metadata]) => ({
            courseName: course,
            ...metadata
          })
        );
      },
      error: (err) => console.error('Failed to load models:', err)
    });
  }

  openIndividualModal(model: any) {
    this.selectedModel = model;
    this.individualInputs = {};
    this.individualResult = null;
  
    // Dynamically populate keys from S3 columns, excluding classAttribute
    Object.keys(model.columns).forEach((col) => {
      if (col !== model.classAttribute) {
        this.individualInputs[col] = null;  // Default: No Value
      }
    });
  
    const modal = new (window as any).bootstrap.Modal(document.getElementById('individualModal'));
    modal.show();
  }

  runIndividualPrediction() {
    const filteredInputs = Object.fromEntries(
      Object.entries(this.individualInputs).filter(([_, val]) => val !== null)
    );
  
    const payload = {
      courseName: this.selectedModel.courseName,
      selectedAttributes: Object.keys(filteredInputs),
      inputValues: filteredInputs,
      comment: this.individualComment
    };
  
    this.instructorService.runIndividualPrediction(payload).subscribe({
      next: (res) => this.individualResult = res,
      error: (err) => {
        console.error("Prediction failed:", err);
        alert("Prediction failed.");
      }
    });
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
