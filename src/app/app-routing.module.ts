import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/management/customer/customer.component';
import { EmployeeComponent } from './pages/management/employee/employee.component';
import { HomesystemComponent } from './pages/homesystem/homesystem.component';
import { LoginComponent } from './pages/login/login.component';
import { ManagementComponent } from './pages/management/management.component';
import { OperatorComponent } from './pages/management/operator/operator.component';
import { SellComponent } from './pages/sell/sell.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'customer', component: CustomerComponent,canActivate:[AuthGuardService]},
  {path:'employee', component: EmployeeComponent, canActivate:[AuthGuardService]},
  {path:'homesystem', component: HomesystemComponent,canActivate:[AuthGuardService]},
  {path:'operator', component: OperatorComponent, canActivate: [AuthGuardService]},
  {path:'management', component: ManagementComponent,canActivate:[AuthGuardService]},
  {path:'sell', component: SellComponent, canActivate:[AuthGuardService]},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
