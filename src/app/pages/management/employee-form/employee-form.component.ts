import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/models/employeeData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm = new FormGroup({
    name :  new FormControl('',[Validators.required]),
    cpf: new FormControl(null,Validators.required),
    rg :  new FormControl(''),
    birth :  new FormControl('') ,
    password :  new FormControl('',Validators.required),
    role :  new FormControl('',Validators.required) ,
    commission : new FormControl(null),
    whats :  new FormControl('',Validators.required) ,
    personal :  new FormControl(''),
    email :  new FormControl('', [Validators.required, Validators.email]) 
  })

  employee!: EmployeeData | any

  exp:any

  constructor(private service: EmployeeService, private router: Router, private guard: AuthGuardService) {
    this.exp = new Date(environment.expDate);

   }

  ngOnInit(): void {
  }

  registerEmployee(){

    if(this.employeeForm.invalid){
      alert("Verifique os campos!")
      return
    }

    this.employee = {
      name :  this.employeeForm.controls.name.value ,
      cpf : this.employeeForm.controls.cpf.value,
      rg :  this.employeeForm.controls.rg.value,
      birth :  this.employeeForm.controls.birth.value ,
      password :  this.employeeForm.controls.password.value ,
      role :  this.employeeForm.controls.role.value ,
      commission : this.employeeForm.controls.commission.value,
      phone : [
       {
          whats :  this.employeeForm.controls.whats.value ,
          personal : this.employeeForm.controls.personal.value
       }
     ],
      email :  this.employeeForm.controls.email.value 
    }
    

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }

    this.service.addEmployee(this.employee).subscribe((response) => {
      alert(` Funcionário ${response.name} cadastrado com sucesso!`)
      this.router.navigate(['management'])
    })
    
    this.employeeForm.reset()

  }
}
