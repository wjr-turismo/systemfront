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

  buttonText:string =  "Adicionar Cliente"

  constructor() { }

  ngOnInit(): void {
  }


  toogle(){
    this.isTableShown = !this.isTableShown

    if(!this.isTableShown){
      this.buttonText = "Listar Clientes"
    }else{
      this.buttonText = "Adicionar Cliente"
    }
  }


}
