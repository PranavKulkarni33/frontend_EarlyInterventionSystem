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

  batchFile: File | null = null;
  batchThreshold: number = 35;
  batchResult: any = null;

  individualInputs: { [key: string]: any } = {};
  individualComment: string = '';
  individualResult: any = null;

  scoreOptions: number[] = Array.from({ length: 101 }, (_, i) => i); // 0 to 100
  objectKeys = Object.keys;
  email: string = '';
  noValueSelected: { [key: string]: boolean } = {};


  constructor(private instructorService: InstructorService, private router: Router, private auth : AuthService) {}

  ngOnInit(): void {
    this.auth.getCurrentUser().then(user => {
      this.email = user.attributes.email;
    });
  
    this.instructorService.getAllModels().subscribe({
      next: (response: any) => {
        console.log('Model Metadata Response:', response);
        this.models = (Object.entries(response) as [string, ModelMetadata][])
        .map(([course, metadata]) => ({
          courseName: course,
          gradingScheme: metadata.gradingScheme,
          outOfMarks: metadata.outOfMarks || {},
          classAttribute: metadata.classAttribute,
          columns: metadata.columns
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
    this.noValueSelected = {}; // Reset checkboxes
    const modal = new (window as any).bootstrap.Modal(document.getElementById('individualModal'));
    modal.show();
  }
  

  handleNoValueToggle(col: string) {
    if (this.noValueSelected[col]) {
      this.individualInputs[col] = null;
    }
  }
  
  getOutOfMark(col: string): number | null {
    if (!this.selectedModel?.outOfMarks) return null;
  
    if (col.toLowerCase().includes("quiz")) return this.selectedModel.outOfMarks["Quiz"];
    if (col.toLowerCase().includes("midterm")) return this.selectedModel.outOfMarks["Midterm"];
    if (col.toLowerCase().includes("final")) return this.selectedModel.outOfMarks["Final"];
    if (this.selectedModel.outOfMarks[col]) return this.selectedModel.outOfMarks[col];
  
    return null;
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

  logout(){
    this.auth.signOut();
    this.router.navigate(['/']);

  }
}
