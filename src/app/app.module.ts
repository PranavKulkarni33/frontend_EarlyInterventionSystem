import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstructorComponent } from './Components/instructor/instructor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { VerificationComponent } from './Components/verification/verification.component';
import { HomeComponent } from './Components/home/home.component';
import { StudentComponent } from './Components/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    InstructorComponent,
    LoginComponent,
    SignupComponent,
    VerificationComponent,
    HomeComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
