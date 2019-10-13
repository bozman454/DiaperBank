import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';

const routes: Routes = [
  { path: '', redirectTo: '/FamilyReg', pathMatch: 'full' },
  {path: "FamilyReg", component: ParentinfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
