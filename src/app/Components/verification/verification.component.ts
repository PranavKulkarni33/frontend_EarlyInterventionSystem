import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  user: User = {} as User;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}


  confirmSignup() {
    this.authService.confirmSignUp(this.user).then(() => {
      this.successMessage = 'Email verified! Please login.';
      this.router.navigate(['/login']);
    }).catch(err => {
      this.errorMessage = err.message || 'Verification failed.';
    });
  }

  resendCode() {
    if (!this.user.email) {
      alert("Enter your email to resend code.");
      return;
    }

    this.authService.resendSignUp(this.user).then(() => {
      this.successMessage = "Verification code sent.";
      this.errorMessage = '';
    }).catch(err => {
      this.errorMessage = err.message || "Resend failed.";
      this.successMessage = '';
    });
  }
}
