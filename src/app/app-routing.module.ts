import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './Components/instructor/instructor.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { VerificationComponent } from './Components/verification/verification.component';
import { StudentComponent } from './Components/student/student.component';
import { InstructorChoiceComponent } from './Components/instructor-choice/instructor-choice.component';
import { InstructorPredictionComponent } from './Components/instructor-prediction/instructor-prediction.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'instructor', component: InstructorComponent },
  { path: 'instructor-choice', component: InstructorChoiceComponent },
  { path: 'instructor-predict', component: InstructorPredictionComponent },
  { path: 'student', component: StudentComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'verification', component: VerificationComponent},

  { path: '**', redirectTo: '' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
