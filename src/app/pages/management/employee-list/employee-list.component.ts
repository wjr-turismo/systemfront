import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service'
import { EmployeeData } from 'src/app/models/employeeData';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  exp:any

  employees!:EmployeeData[] |any

  isTableShown:boolean=true

  buttonText:string =  "Adicionar Funcionário"


  constructor(private service:EmployeeService, private guard: AuthGuardService) {

    this.exp = new Date(environment.expDate)

   }

  ngOnInit(): void {

    if (this.exp < new Date()) {
      console.log("AAAA")
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getEmployees()
    }



  }

  getEmployees(){
    this.service.getEmployees().subscribe((employess) => {

      this.employees = employess
      console.log(employess)

    })
  }

  toogle(){
    this.isTableShown = !this.isTableShown

    if(!this.isTableShown){
      this.buttonText = "Listar Funcionários"
    }else{
      this.buttonText = "Adicionar Funcionário"
    }
  }

  print(a:any){
    console.log(a)
    environment.idAux  = a
  }


}
