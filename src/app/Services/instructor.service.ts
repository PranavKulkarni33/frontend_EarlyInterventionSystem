import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private baseUrl = 'http://127.0.0.1:5000'; // Update if deployed elsewhere

  constructor(private http: HttpClient) {}

  uploadCSV(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/preprocess`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getAllModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/models`);
  }

  runBatchPrediction(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/predict-batch`, formData);
  }

  runIndividualPrediction(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/predict-individual`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
