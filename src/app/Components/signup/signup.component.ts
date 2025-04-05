import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/Services/links.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/Interfaces/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  user: User = { showPassword: false } as User;
  confirmPassword: string = '';
  errorMessage: string = '';


  constructor(private links: LinksService,
    private router: Router, 
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.authService.getUser().then(user => {
      if (user) this.router.navigate(['/student']);
    }).catch(() => {});
  }

  signup() {
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.signUp(this.user).then(() => {
      this.router.navigate(['/verification']);
    }).catch(err => {
      this.errorMessage = err.message || 'Signup failed.';
    });
  }

  verifyEmail() {
    this.router.navigate(['/verification']);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  togglePasswordVisibility() {
    this.user.showPassword = !this.user.showPassword;
  }

  openLogin(){
    this.links.openLogin();
  }

  openValidate(){
    this.links.openValidate();
  }

    // Validate email fields using a regex and restrict certain domains.
    validateEmailFields(): void {
        document.querySelectorAll<HTMLInputElement>('.email-input').forEach((emailField) => {
          emailField.addEventListener('input', () => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValue = emailField.value.trim();
            
            if (!emailPattern.test(emailValue)) {
              emailField.setCustomValidity("Please enter a valid email address (e.g., name@example.com)");
            } else if (!emailField.value) {
              emailField.setCustomValidity("Email address is required. Please provide your email.");
            } else {
              emailField.setCustomValidity("");
            }
          });
        });
      }
}
