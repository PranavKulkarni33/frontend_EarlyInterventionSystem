import { Component } from '@angular/core';
import { LinksService } from 'src/app/Services/links.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
constructor(private links: LinksService){}

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
