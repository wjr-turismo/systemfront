import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeData } from 'src/app/models/employeeData';
import { EmployeeService } from 'src/app/services/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role'),email:localStorage.getItem('email')}

  isDisable: boolean = true

  employeeForm = new FormGroup({
    name :  new FormControl({value:'',disabled:this.isDisable},  [Validators.required]),
    cpf: new FormControl({value:null,disabled:this.isDisable},[Validators.required,Validators.maxLength(11)]),
    rg :  new FormControl({value:'',disabled:this.isDisable}),
    birth :  new FormControl({value:'',disabled:this.isDisable}) ,
    password :  new FormControl({value:'',disabled:this.isDisable},Validators.required),
    role :  new FormControl({value:null,disabled:this.isDisable},Validators.required) ,
    commission : new FormControl({value:null,disabled:this.isDisable},Validators.required),
    whats :  new FormControl({value:'',disabled:this.isDisable},Validators.required) ,
    personal :  new FormControl({value:'',disabled:this.isDisable}),
    email :  new FormControl({value:'',disabled:this.isDisable}, [Validators.required, Validators.email]) 
  })

  employee!: EmployeeData | any

  

  constructor(private service: EmployeeService) { }

  ngOnInit(): void {

    this.getEmployee()

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
      console.log(`Response: ${response.name}`)
    })
    

    console.log("IMPRIMINDO")
    console.log(this.employeeForm)
    console.log(`Whats: ${this.employeeForm.controls.whats.value}`)
    console.log(this.employee)

  }

  getEmployee(){
    this.service.getEmployee(environment.idAux).subscribe((response) => {
      console.log(response)
      this.employee = response


    })


  }

}
