import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { LandingComponent } from './landing/landing.component';
import { ShowpeopleComponent } from './showpeople/showpeople.component'
import { ConfirmComponent } from './confirm/confirm.component'; 
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: "index", component: LandingComponent },
  { path: "FamilyReg", component: ParentinfoComponent },
  { path: 'show', component: ShowpeopleComponent },
  { path: 'Confirm', component: ConfirmComponent },
  { path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
