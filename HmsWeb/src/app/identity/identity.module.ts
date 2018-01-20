import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IdentityRoutingModule } from './identity-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule
  ],
  exports: [

  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class IdentityModule { }
