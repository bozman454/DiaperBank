import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { ChildinfoComponent } from './childinfo/childinfo.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';


import { MatMenuModule } from '@angular/material/menu'; 
import { MatDividerModule } from '@angular/material/divider'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material'; 
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'; 
import { RegisterService } from './register.service';
import { LandingComponent } from './landing/landing.component';
import { ShowpeopleComponent } from './showpeople/showpeople.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ParentInfoClass } from './parentInfoClass';
import { AboutComponent } from './about/about.component'
import { ChildInfoClass } from './childInfoClass';
import { HelpComponent } from './help/help.component';
import { Child } from './child';  


import { OnlycharDirective } from './directives/charOnlyDirective';
import { OnlynumDirective } from './directives/numOnlyDirective';

@NgModule({
  declarations: [
    AppComponent,
    ParentinfoComponent,
    LoginComponent,
    ChildinfoComponent,
    LandingComponent,
    ShowpeopleComponent,
    ConfirmComponent,
    AboutComponent,
    HelpComponent,
    OnlycharDirective,
    OnlynumDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,       
  ],
  providers: [ParentInfoClass, RegisterService, ChildInfoClass, Child, ],
  bootstrap: [AppComponent,]
})
export class AppModule { }
