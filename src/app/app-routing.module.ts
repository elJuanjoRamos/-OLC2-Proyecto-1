import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./components/dashboard/dashboard.component" 
import { ReportsComponent } from "./components/reports/reports.component"
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
