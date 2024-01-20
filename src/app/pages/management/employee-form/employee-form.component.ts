import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/models/employeeData';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm = new FormGroup({
    name :  new FormControl('',[Validators.required]),
    cpf: new FormControl(null,[Validators.required,Validators.maxLength(11)]),
    rg :  new FormControl(''),
    birth :  new FormControl('') ,
    password :  new FormControl('',Validators.required),
    role :  new FormControl('',Validators.required) ,
    commission : new FormControl(null,Validators.required),
    whats :  new FormControl('',Validators.required) ,
    personal :  new FormControl(''),
    email :  new FormControl('', [Validators.required, Validators.email]) 
  })

  employee!: EmployeeData | any

  constructor(private service: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  registerEmployee(){

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
    
    this.service.addEmployee(this.employee).subscribe((response) => {
      alert(` Funcionário ${response.name} cadastrado com sucesso!`)
      this.router.navigate(['management'])
    })
    
    this.employeeForm.reset()

  }
}
