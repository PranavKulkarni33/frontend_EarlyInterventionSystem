import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-instructor-choice',
  templateUrl: './instructor-choice.component.html',
  styleUrls: ['./instructor-choice.component.css']
})
export class InstructorChoiceComponent {
  constructor(private router: Router, private auth : AuthService) {}

  goToCreateModel() {
    this.router.navigate(['/instructor']);
  }

  goToPrediction() {
    this.router.navigate(['/instructor-predict']);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  

}
