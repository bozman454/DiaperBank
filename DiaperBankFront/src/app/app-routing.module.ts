import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: "index", component: LandingComponent },
  { path: "FamilyReg", component: ParentinfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
