import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './Components/instructor/instructor.component';
import { HomeComponent } from './Components/home/home.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'instructor', component: InstructorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
