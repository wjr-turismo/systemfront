import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service'
import { EmployeeData } from 'src/app/models/employeeData';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees!:EmployeeData[] |any

  isTableShown:boolean=true

  buttonText:string =  "Adicionar Funcionário"


  constructor(private service:EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees()

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
  }


}
