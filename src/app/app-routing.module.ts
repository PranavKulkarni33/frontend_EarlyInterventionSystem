import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstructorComponent } from './Components/instructor/instructor.component';

const routes: Routes = [
  { path: '', redirectTo: '/instructor', pathMatch: 'full' },
  { path: 'instructor', component: InstructorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
