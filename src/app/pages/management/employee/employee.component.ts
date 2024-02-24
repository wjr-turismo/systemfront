import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/app/models/employeeData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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
  employee!: EmployeeData | any


  employeeForm = new FormGroup({
    name :  new FormControl('',[Validators.required]),
    cpf: new FormControl(null,[Validators.required,Validators.maxLength(11)]),
    rg :  new FormControl(''),
    birth :  new FormControl('') ,
    password :  new FormControl(null),
    role :  new FormControl('',Validators.required) ,
    commission : new FormControl(null,Validators.required),
    whats :  new FormControl('',Validators.required) ,
    personal :  new FormControl(''),
    email :  new FormControl('', [Validators.required, Validators.email]) 
  })

  
  exp:any
  constructor(private service: EmployeeService, private guard: AuthGuardService, private router: Router) { 
    this.exp = new Date(environment.expDate);

  }

  ngOnInit(): void {

   if(environment.idAux!=0){ 
    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getEmployee() 
    }
    
  }
    

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

    this.check()
    
    this.service.addEmployee(this.employee).subscribe((response) => {
      alert(` Funcionário ${response.name} cadastrado com sucesso!`)
      this.router.navigate(['management'])
    })
    

  }

  getEmployee(){
    
    this.check()

    this.service.getEmployee(environment.idAux).subscribe((response) => {
      this.employee = response
    })


  }

  editEmployee(){
    this.isDisable = false
    //location.reload()

    this.employeeForm.controls.name.setValue(this.employee.name)
    this.employeeForm.controls.cpf.setValue(this.employee.cpf)
    this.employeeForm.controls.rg.setValue(this.employee.rg)  
    this.employeeForm.controls.birth.setValue(this.employee.birth)
    this.employeeForm.controls.role.setValue(this.employee.role)
    this.employeeForm.controls.commission.setValue(this.employee.commission)
    this.employeeForm.controls.whats.setValue(this.employee.phone[0].whats)
    this.employeeForm.controls.personal.setValue(this.employee.phone[0].personal)
    this.employeeForm.controls.email.setValue(this.employee.email)
    this.employeeForm.controls.password.setValue(null)
    
    
    
  }

  putEmployee(){
    console.log(this.employeeForm.controls.password.value)
    console.log(this.employee.password)

    if(this.employeeForm.controls.password.value != null){
     
      this.employee = {
        name :  this.employeeForm.controls.name.value,
        cpf : this.employeeForm.controls.cpf.value,
        rg :  this.employeeForm.controls.rg.value,
        birth :  this.employeeForm.controls.birth.value,
        role :  this.employeeForm.controls.role.value,
        commission : this.employeeForm.controls.commission.value,
        password: this.employeeForm.controls.password.value,
        phone : [
         {
            whats :  this.employeeForm.controls.whats.value,
            personal : this.employeeForm.controls.personal.value
         }
       ],
        email :  this.employeeForm.controls.email.value 
      }
      
     console.log(this.employee)
    }else{
      this.employee = {
        name :  this.employeeForm.controls.name.value,
        cpf : this.employeeForm.controls.cpf.value,
        rg :  this.employeeForm.controls.rg.value,
        birth :  this.employeeForm.controls.birth.value,
        role :  this.employeeForm.controls.role.value,
        commission : this.employeeForm.controls.commission.value,
        phone : [
         {
            whats :  this.employeeForm.controls.whats.value,
            personal : this.employeeForm.controls.personal.value
         }
       ],
        email :  this.employeeForm.controls.email.value 
      }
    }


    this.check()
    
    this.service.putEmployee(this.employee,environment.idAux).subscribe((response) => {
      alert(` Funcionário ${response.name} atualizado com sucesso!`)
      this.router.navigate(['management'])

      if(this.employee.role == "ADMIN"){
        localStorage.clear()
        this.guard.canActivate()
    }
    }) 

  }

  disable(){
    this.isDisable = true
  }

  deleteEmployee(id:number){
   
    this.check()
   
  this.service.deleteEmployee(id).subscribe((response) => {
    alert(` Funcionário ${response.name} removido com sucesso!`)
      this.router.navigate(['management'])
  })

  }

  check(){
    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }
  }
}

