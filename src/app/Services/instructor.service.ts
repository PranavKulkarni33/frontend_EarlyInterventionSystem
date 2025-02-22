import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private apiUrl = 'https://your-api-url.execute-api.us-east-1.amazonaws.com/dev/upload'; // Change to actual API endpoint

  constructor(private http: HttpClient) {}

  uploadCSV(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
