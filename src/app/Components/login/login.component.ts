import { Component } from '@angular/core';
import { LinksService } from 'src/app/Services/links.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   constructor(private links: LinksService){}

   openSignup(){
    this.links.openSignup();
   }
}
