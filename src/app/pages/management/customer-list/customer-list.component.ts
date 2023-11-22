import { Component, OnInit } from '@angular/core';
import { customerData } from 'src/app/models/customerData';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers!: customerData[] | any
  customer!: customerData | any

  isTableShown:boolean=true

  buttonText:string =  "Adicionar Funcionários"

  constructor() { }

  ngOnInit(): void {
  }


  toogle(){
    this.isTableShown = !this.isTableShown

    if(!this.isTableShown){
      this.buttonText = "Listar Funcionários"
    }else{
      this.buttonText = "Adicionar Funcionários"
    }
  }


}
