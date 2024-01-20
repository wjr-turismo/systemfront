import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { operatorData } from 'src/app/models/operatorData';
import { OperatorService } from 'src/app/services/operator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role'),email:localStorage.getItem('email')}


  operator!: operatorData |any
  isDisable: boolean = true

  operatorForm= new FormGroup({
    name :  new FormControl('',[Validators.required]),
    companyName: new FormControl(''),
    representativeName: new FormControl(''),
    representativeEmail: new FormControl(''),
    representativePhone: new FormControl('')
  })

  constructor(private service: OperatorService, private router: Router) { }

  ngOnInit(): void {


    if(environment.idAux!=0) {this.getOperator()}
    
  }


  registerOperator(){

    this.operator = {
      name: this.operatorForm.controls.name.value,
      companyName: this.operatorForm.controls.companyName.value,
      representativeName: this.operatorForm.controls.representativeName.value,
      representativeEmail: this.operatorForm.controls.representativeEmail.value,
      representativePhone: this.operatorForm.controls.representativePhone.value
    }

    
    
    this.service.addOperator(this.operator).subscribe((response) =>{
      alert(` Operadora ${response.name} cadastrada com sucesso!`)
      this.router.navigate(['management'])
    })


  }

  getOperator(){
  
    this.service.getOperator(environment.idAux).subscribe((response) => {
      
      this.operator = response
    })
  }

  editOperator(){
    this.isDisable = false

    this.operatorForm.controls.name.setValue(this.operator.name)
    this.operatorForm.controls.companyName.setValue(this.operator.companyName)
    this.operatorForm.controls.representativeName.setValue(this.operator.representativeName)
    this.operatorForm.controls.representativeEmail.setValue(this.operator.representativeEmail)
    this.operatorForm.controls.representativePhone.setValue(this.operator.representativePhone)
  }

  disable(){
    this.isDisable = true
  }

  putOperator(){

    this.operator = {
      name: this.operatorForm.controls.name.value,
      companyName: this.operatorForm.controls.companyName.value,
      representativeName: this.operatorForm.controls.representativeName.value,
      representativeEmail: this.operatorForm.controls.representativeEmail.value,
      representativePhone: this.operatorForm.controls.representativePhone.value
    }

    
    
    if(environment.idAux!=0){
      this.service.putOperator(this.operator,environment.idAux).subscribe((response) =>{
        alert(` Operadora ${response.name} atualizada com sucesso!`)
        this.router.navigate(['management'])
    })
    }

  }

  deleteOperator(id:number){
    

    this.service.deleteOperator(id).subscribe((response) => {
      alert(` Operadora ${response.name} removida com sucesso!`)
      this.router.navigate(['management'])
      
    })
  }
}
