import { Component, OnInit } from '@angular/core';
import { operatorData } from 'src/app/models/operatorData';
import { OperatorService } from 'src/app/services/operator.service';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.css']
})
export class OperatorListComponent implements OnInit {

  isTableShown:boolean = true

  operators!: operatorData[] |any

  buttonText:string = "Adicionar Operadora"

  constructor(private service: OperatorService) { }

  ngOnInit(): void {
    this.getOperators()
  }


  toogle(){
    this.isTableShown = !this.isTableShown

    if(!this.isTableShown){
      this.buttonText = "Listar Operadoras"
    }else{
      this.buttonText = "Adicionar Operadora"
    }
  }

  getOperators(){

    this.service.getOperators().subscribe((response) => {
      this.operators = response
      console.log(response)
    })

  }


}
