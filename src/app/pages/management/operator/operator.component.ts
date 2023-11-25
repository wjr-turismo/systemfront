import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { operatorData } from 'src/app/models/operatorData';
import { OperatorService } from 'src/app/services/operator.service';

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

  editOperator(){
    this.isDisable = false

  }

}
