import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}
  isShown:boolean = true

  buttonText:string =  "Adicionar Funcionários"

  constructor() { }

  ngOnInit(): void {
  }

  toogle(){
    this.isShown= !this.isShown
    
    if(!this.isShown){
      this.buttonText = "Listar Funcionários"
    }else{
      this.buttonText = "Adicionar Funcionários"
    }

  }

}
