import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/Services/links.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {} as User;
  errorMessage: string = '';
  resetEmail: string = '';
  resetCode: string = '';
  newPassword: string = '';
  isPasswordResetStep2: boolean = false;

   constructor(private links: LinksService, private router: Router, private authService: AuthService){}

   ngOnInit(): void {
    this.authService.isAuthenticated().then((user) => {
      if (user && user.attributes && user.attributes['custom:role']) {
        this.redirectBasedOnRole(user.attributes['custom:role']);
      }
    }).catch(() => {
      // Not logged in — do nothing.
    });
  }
  

  login() {
    this.authService.login(this.user).then(() => {
      this.authService.getRole().then(role => {
        this.redirectBasedOnRole(role);
      });
    }).catch(err => {
      alert(err.message || 'Login failed.');
    });
  }

  redirectBasedOnRole(role: string) {
    if (role === 'Student') {
      this.router.navigate(['/student']);
    } else if (role === 'Instructor') {
      this.router.navigate(['/instructor-choice']);
    }
  }

  openForgotPasswordModal(event: Event) {
    event.preventDefault();
    const modalElement = document.getElementById('forgotPasswordModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  sendPasswordResetCode() {
    if (!this.resetEmail) {
      alert('Please enter your email.');
      return;
    }
    this.authService.forgotPassword(this.resetEmail).then(() => {
      alert('Reset code sent to your email.');
      this.isPasswordResetStep2 = true;
    }).catch(err => alert(err.message || 'Error sending code.'));
  }

  confirmResetPassword() {
    if (!this.resetCode || !this.newPassword) {
      alert('Enter reset code and new password.');
      return;
    }
    this.authService.confirmResetPassword(this.resetEmail, this.resetCode, this.newPassword).then(() => {
      alert('Password reset successfully.');
      this.isPasswordResetStep2 = false;
      const modalElement = document.getElementById('forgotPasswordModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    }).catch(err => alert(err.message || 'Reset failed.'));
  }

  goBackToLogin() {
    this.isPasswordResetStep2 = false;
  }

   openSignup(){
    this.links.openSignup();
   }
}
