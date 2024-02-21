import { Component, OnInit } from '@angular/core';
import { operatorData } from 'src/app/models/operatorData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { OperatorService } from 'src/app/services/operator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.css']
})
export class OperatorListComponent implements OnInit {

  exp:any

  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}

  isTableShown:boolean = true

  operators!: operatorData[] |any

  buttonText:string = "Adicionar Operadora"

  constructor(private service: OperatorService, private guard: AuthGuardService) {

    this.exp = new Date(environment.expDate);

   }

  ngOnInit(): void {

    if (this.exp < new Date()) {
      
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getOperators()
    }


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

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }
    
    this.service.getOperators().subscribe((response) => {
      this.operators = response
      
    })

  }

  print(a:number){
    
    environment.idAux = a
  }


}
