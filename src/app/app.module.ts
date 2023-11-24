import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import {RouterModule } from '@angular/router'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-guard.service';
import { HomesystemComponent } from './pages/homesystem/homesystem.component';
import { MenuComponent } from './menu/menu.component';
import { ManagementComponent } from './pages/management/management.component';
import { EmployeeListComponent } from './pages/management/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/management/employee-form/employee-form.component';
import { CustomerListComponent } from './pages/management/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/management/customer-form/customer-form.component';
import { OperatorListComponent } from './pages/management/operator-list/operator-list.component';
import { OperatorFormComponent } from './pages/management/operator-form/operator-form.component';
import { SellComponent } from './pages/sell/sell.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    LoginComponent,
    HomesystemComponent,
    MenuComponent,
    ManagementComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    CustomerListComponent,
    CustomerFormComponent,
    OperatorListComponent,
    OperatorFormComponent,
    SellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'customer', component: CustomerComponent,canActivate:[AuthGuardService]},
      {path:'homesystem', component: HomesystemComponent,canActivate:[AuthGuardService]},
      {path:'management', component: ManagementComponent,canActivate:[AuthGuardService]},
      {path:'sell', component: SellComponent, canActivate:[AuthGuardService]},
      {path:'login', component: LoginComponent}
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
