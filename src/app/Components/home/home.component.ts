import { Component } from '@angular/core';
import { LinksService } from 'src/app/Services/links.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 constructor(private links: LinksService){}

 openLogin(){
  this.links.openLogin();
 }

 openSignup(){
  this.links.openSignup();
 }
}
