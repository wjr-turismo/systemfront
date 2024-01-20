import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customerData } from 'src/app/models/customerData';
import { CustomerService } from 'src/app/services/customer.service';

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

  customer!: customerData|any

  constructor(private service: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }


  registercustomer(){

    

    this.customer = {
      name: this.customerForm.controls.name.value,
      cpf: this.customerForm.controls.cpf.value,
      rg: this.customerForm.controls.rg.value,
      birth: this.customerForm.controls.birth.value,
      email: this.customerForm.controls.email.value,
      places: this.customerForm.controls.places.value,
      tripDates: this.customerForm.controls.tripDates.value,
      dependents: [
        {
          name: this.customerForm.controls.namedep1.value,
          description: this.customerForm.controls.descriptiondep1.value,
          rg: this.customerForm.controls.rgdep1.value,
          cpf: this.customerForm.controls.cpfdep1.value
        }
      ],
      phone: [
        {
          whats: this.customerForm.controls.whats.value,
          personal: this.customerForm.controls.personal.value
        }
      ]
    }


    this.service.addCustomer(this.customer).subscribe((response) => {
      
      this.customer = response
      alert(`Cliente ${this.customer.name} cadastrado com sucesso!`)
      this.router.navigate(['management'])
    })
    

    this.customerForm.reset()
    

  }


}
