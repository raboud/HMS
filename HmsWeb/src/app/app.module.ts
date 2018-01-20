import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
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
import { StaffElementComponent } from './main/team/staff-element/staff-element.component';
import { ExpectComponent } from './main/expect/expect.component';
import { StoreModule } from './store/store.module';
import { IdentityModule } from './identity/identity.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ExpertiseComponent,
    TeamComponent,
    PracticeComponent,
    PatientsComponent,
    IvTherapyComponent,
    ArticlesComponent,
    ContactComponent,
    DoctorsComponent,
    StaffComponent,
    StaffElementComponent,
    ExpectComponent
  ],
  imports: [
    BrowserModule,
    StoreModule,
    IdentityModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
