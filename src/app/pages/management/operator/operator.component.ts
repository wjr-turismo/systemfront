import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: OperatorService) { }

  ngOnInit(): void {
    this.getOperator()
  }


  registerOperator(){

    this.operator = {
      name: this.operatorForm.controls.name.value,
      companyName: this.operatorForm.controls.companyName.value,
      representativeName: this.operatorForm.controls.representativeName.value,
      representativeEmail: this.operatorForm.controls.representativeEmail.value,
      representativePhone: this.operatorForm.controls.representativePhone.value
    }

    console.log(this.operator)
    this.service.addOperator(this.operator).subscribe((response) =>{
        console.log(`RESPONSE: ${response}`)
    })


  }

  getOperator(){
    console.log(environment.idAux)
    this.service.getOperator(environment.idAux).subscribe((response) => {
      console.log(`response: ${response.name}`)
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

}
