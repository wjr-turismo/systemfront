import { Component, OnInit } from '@angular/core';
import { operatorData } from 'src/app/models/operatorData';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.css']
})
export class OperatorListComponent implements OnInit {

  isTableShown:boolean = true

  operators!: operatorData[]

  buttonText:string = "Adicionar Operadora"

  constructor() { }

  ngOnInit(): void {
  }


  toogle(){
    this.isTableShown = !this.isTableShown

    if(!this.isTableShown){
      this.buttonText = "Listar Operadoras"
    }else{
      this.buttonText = "Adicionar Operadora"
    }
  }

}
