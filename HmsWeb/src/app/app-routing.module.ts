import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ExpertiseComponent } from './main/expertise/expertise.component';
import { TeamComponent } from './main/team/team.component';
import { PracticeComponent } from './main/practice/practice.component';
import { PatientsComponent } from './main/patients/patients.component';
import { IvTherapyComponent } from './main/iv-therapy/iv-therapy.component';
import { ArticlesComponent } from './main/articles/articles.component';
import { ContactComponent } from './main/contact/contact.component';
import { DoctorsComponent } from './main/team/doctors/doctors.component';
import { StaffComponent } from './main/team/staff/staff.component';
import { ExpectComponent } from './main/expect/expect.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'expertise', component: ExpertiseComponent },
  { path: 'team', component: TeamComponent },
  { path: 'practice', component: PracticeComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'iv_therapy', component: IvTherapyComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'doctors', component: DoctorsComponent},
  { path: 'staff', component: StaffComponent},
  { path: 'expect', component: ExpectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
