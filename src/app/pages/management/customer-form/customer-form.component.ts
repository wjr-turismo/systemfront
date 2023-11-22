import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customerData } from 'src/app/models/customerData';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  customerForm = new FormGroup({
    name :  new FormControl('',[Validators.required]),
    cpf: new FormControl(null,[Validators.required,Validators.maxLength(11)]),
    rg :  new FormControl(''),
    birth :  new FormControl('') ,
    email :  new FormControl('', [Validators.required, Validators.email]),
    places: new FormControl(''),
    tripDates: new FormControl(''),
    whats :  new FormControl('',Validators.required) ,
    personal :  new FormControl(''),
    namedep1: new FormControl(''),
    descriptiondep1: new FormControl(''),
    rgdep1: new FormControl(''),
    cpfdep1: new FormControl(null)
  })

  customer!: customerData

  constructor() { }

  ngOnInit(): void {
  }


  registercustomer(){

    console.log(this.customerForm)
    /*this.customer = {
      name: string,
      cpf: number,
      rg: string,
      birth: Date,
      email: string,
      places: string,
      tripDates: string,
      dependents: [
        {
          name: string,
          description: string,
          rg: string,
          cpf: number
        }
      ],
      phone: [
        {
          whats: string,
          personal: string
        }
      ]
    }*/


  }


}
