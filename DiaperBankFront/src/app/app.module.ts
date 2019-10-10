import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { ChildinfoComponent } from './childinfo/childinfo.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider'; 
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    ParentinfoComponent,
    LoginComponent,
    ChildinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
