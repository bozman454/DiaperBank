import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { ChildinfoComponent } from './childinfo/childinfo.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import {MatMenuModule} from '@angular/material/menu'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'; 
import { RegisterService } from './register.service';
import { LandingComponent } from './landing/landing.component';
import { ShowpeopleComponent } from './showpeople/showpeople.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentinfoComponent,
    LoginComponent,
    ChildinfoComponent,
    LandingComponent,
    ShowpeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
