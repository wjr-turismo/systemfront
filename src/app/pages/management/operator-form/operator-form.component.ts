import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-operator-form',
  templateUrl: './operator-form.component.html',
  styleUrls: ['./operator-form.component.css']
})
export class OperatorFormComponent implements OnInit {

  operatorForm= new FormGroup({
    name :  new FormControl('',[Validators.required]),
    companyName: new FormControl(''),
    representativeName: new FormControl(''),
    representativeEmail: new FormControl(''),
    representativePhone: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }


  registeroperator(){
    
  }

}
