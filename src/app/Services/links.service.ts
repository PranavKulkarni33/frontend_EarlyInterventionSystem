import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private router: Router){}

  openLogin(){
    this.router.navigate(["/login"]);
  }
  openSignup(){
    this.router.navigate(["/signup"]);
  }
  openValidate(){
    this.router.navigate(["/verification"])
  }
}
