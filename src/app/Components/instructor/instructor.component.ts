import { Component } from '@angular/core';
import { InstructorService } from 'src/app/Services/instructor.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {
  courseName: string = '';
  gradingComponents: string[] = ["Assignment", "Quiz", "Labs", "Midterm", "Lab Test", "Final"];
  selectedComponents: string[] = [];
  customComponentEnabled: boolean = false;
  customComponent: string = '';
  gradingScheme: { [key: string]: number } = {};
  selectedFile: File | null = null;
  previewData: any[] = [];
  previewColumns: string[] = [];
  classAttribute: string = '';  // Selected class attribute
  isDataConfirmed: boolean = false;
  updatedCSV: string = '';  // Stores the processed CSV data

  constructor(private instructorService: InstructorService) {}

  toggleComponent(component: string, event: any) {
    if (event.target.checked) {
      this.selectedComponents.push(component);
      this.gradingScheme[component] = 0;
    } else {
      this.selectedComponents = this.selectedComponents.filter(item => item !== component);
      delete this.gradingScheme[component];
    }
  }

  toggleCustomComponent(event: any) {
    this.customComponentEnabled = event.target.checked;
    if (!this.customComponentEnabled) {
      this.customComponent = '';
    } else {
      this.selectedComponents.push(this.customComponent);
      this.gradingScheme[this.customComponent] = 0;
    }
  }

  get totalGradingWeight(): number {
    return Object.values(this.gradingScheme).reduce((sum, val) => sum + (val || 0), 0);
  }

  validateTotalWeight() {
    if (this.totalGradingWeight > 100) {
      alert("Total weightage cannot exceed 100%");
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.isDataConfirmed = false;
  }

  updateCSVData() {
    if (!this.selectedFile) {
      alert("Please upload a CSV file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result as string;
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          let data: any[] = result.data as any[];
          if (data.length === 0) {
            alert("CSV file is empty.");
            return;
          }

          // Original columns from CSV
          let columns: string[] = Object.keys(data[0]);

          console.log("Original Columns:", columns);
          console.log("Selected Components:", this.selectedComponents);


          // Prepare for sequential renaming
          const columnMapping: { [key: string]: string } = {};
          const componentCounter: { [key: string]: number } = {};

          // 1) Map columns for selected standard components
          columns.forEach((col) => {
            for (let component of this.selectedComponents) {
              // e.g. "Lab Test" -> "LabTest" for matching
              const regex = new RegExp(component.replace(/\s/g, ''), 'i'); // Looser match

              if (regex.test(col)) {
                // If first time, initialize
                if (!componentCounter[component]) {
                  componentCounter[component] = 1;
                } else {
                  componentCounter[component]++;
                }
                // Assign "component + index" => e.g. "Assignments1", "Assignments2"
                columnMapping[col] = component + componentCounter[component];
                break; // Stop once matched
              }
            }
          });

          // 2) Map columns for the "Other" component if selected
          if (this.customComponentEnabled && this.customComponent) {
            columns.forEach((col) => {
              if (col.toLowerCase().includes(this.customComponent.toLowerCase())) {
                if (!componentCounter[this.customComponent]) {
                  componentCounter[this.customComponent] = 1;
                } else {
                  componentCounter[this.customComponent]++;
                }
                columnMapping[col] = this.customComponent + componentCounter[this.customComponent];
              }
            });
          }

          // 3) Create new rows with renamed columns only
          data = data.map(row => {
            let newRow: any = {};
            Object.keys(columnMapping).forEach(originalCol => {
              newRow[columnMapping[originalCol]] = row[originalCol];
            });
            return newRow;
          });

          console.log("Selected Components:", this.selectedComponents);
          console.log("Column Mapping:", columnMapping);
          console.log("Processed Data Preview:", data.slice(0, 5));

          // Show first 5 rows in preview
          this.previewData = data.slice(0, 5);
          this.previewColumns = Object.keys(this.previewData[0] || {});
          this.isDataConfirmed = true;
        }
      });
    };
    reader.readAsText(this.selectedFile);
  }

  submitData() {
    if (!this.courseName || this.totalGradingWeight !== 100 || !this.selectedFile || !this.isDataConfirmed || !this.classAttribute) {
      alert("Ensure all fields are filled, weightage totals 100%, class attribute selected, and CSV data is confirmed.");
      return;
    }

    const formData = new FormData();
    formData.append('courseName', this.courseName);
    formData.append('gradingScheme', JSON.stringify(this.gradingScheme));
    formData.append('classAttribute', this.classAttribute);
    formData.append('file', new Blob([this.updatedCSV], { type: 'text/csv' }), 'updated_data.csv');

    this.instructorService.uploadCSV(formData).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: () => {
        alert("Error uploading data.");
      }
    });
  }
}
