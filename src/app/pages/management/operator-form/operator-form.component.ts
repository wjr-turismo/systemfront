import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { operatorData } from 'src/app/models/operatorData';
import { OperatorService } from 'src/app/services/operator.service';

@Component({
  selector: 'app-operator-form',
  templateUrl: './operator-form.component.html',
  styleUrls: ['./operator-form.component.css']
})
export class OperatorFormComponent implements OnInit {

  operator!: operatorData |any

  operatorForm= new FormGroup({
    name :  new FormControl('',[Validators.required]),
    companyName: new FormControl(''),
    representativeName: new FormControl(''),
    representativeEmail: new FormControl(''),
    representativePhone: new FormControl('')
  })

  constructor(private service: OperatorService, private router: Router) { }

  ngOnInit(): void {
  }


  registeroperator(){

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

    this.operatorForm.reset()
  }

}
