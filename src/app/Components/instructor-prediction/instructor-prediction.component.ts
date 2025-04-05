import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/Services/instructor.service';
import { ModelMetadata } from 'src/app/Interfaces/model-metadata';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-instructor-prediction',
  templateUrl: './instructor-prediction.component.html',
  styleUrls: ['./instructor-prediction.component.css']
})
export class InstructorPredictionComponent implements OnInit {

  models: any[] = [];
  selectedModel: any = null;

  batchFile: File | null = null;
  batchThreshold: number = 35;
  batchResult: any = null;

  individualInputs: { [key: string]: any } = {};
  individualComment: string = '';
  individualResult: any = null;

  scoreOptions: number[] = Array.from({ length: 101 }, (_, i) => i); // 0 to 100
  objectKeys = Object.keys;
  email: string = '';

  constructor(private instructorService: InstructorService, private router: Router, private auth : AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().then(user => {
      this.email = user.attributes.email;
    });
  
    this.instructorService.getAllModels().subscribe({
      next: (response: any) => {
        this.models = (Object.entries(response) as [string, ModelMetadata][])
          .map(([course, metadata]) => ({
            courseName: course,
            ...metadata
          }));
      },
      error: (err) => {
        console.error('Failed to load models:', err);
      }
    });
  }

  openBatchModal(model: any) {
    this.selectedModel = model;
    this.batchFile = null;
    this.batchResult = null;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('batchModal'));
    modal.show();
  }

  openIndividualModal(model: any) {
    this.selectedModel = model;
    this.individualInputs = {};
    this.individualResult = null;
    const modal = new (window as any).bootstrap.Modal(document.getElementById('individualModal'));
    modal.show();
  }

  onBatchFileChange(event: any) {
    this.batchFile = event.target.files[0];
  }

  runBatchPrediction() {
    if (!this.batchFile) {
      alert("Please upload a CSV file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", this.batchFile);
    formData.append("courseName", this.selectedModel.courseName);
    formData.append("threshold", this.batchThreshold.toString());
    formData.append("email", this.email); 
  
    this.instructorService.runBatchPrediction(formData).subscribe({
      next: (res) => {
        this.batchResult = res;
        console.log("Batch Prediction Result:", res);
      },
      error: (err) => {
        console.error("Batch prediction failed:", err);
        alert("Batch prediction failed.");
      }
    });
  }

  runIndividualPrediction() {
    const payload = {
      courseName: this.selectedModel.courseName,
      selectedAttributes: Object.keys(this.individualInputs).filter(key => this.individualInputs[key] !== null),
      inputValues: this.individualInputs,
      comment: this.individualComment
    };

    this.instructorService.runIndividualPrediction(payload).subscribe({
      next: (res) => this.individualResult = res,
      error: (err) => {
        console.error("Individual prediction failed:", err);
        alert("Individual prediction failed.");
      }
    });
  }

  filteredInputColumns(): string[] {
    if (!this.selectedModel?.columns || !this.selectedModel?.classAttribute) return [];
    return this.selectedModel.columns.filter((col: string) => col !== this.selectedModel.classAttribute);
  }

  goBack() {
    this.router.navigate(['/instructor-choice']);
  }
}
