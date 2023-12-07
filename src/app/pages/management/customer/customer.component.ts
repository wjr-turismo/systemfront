import { Component, OnInit } from '@angular/core';
import { customerData } from '../../../models/customerData'
import { CustomerService } from '../../../services/customer.service'
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
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

  customers!: customerData[]
  
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role'),email:localStorage.getItem('email')}

  sct!:string

  constructor(private service: CustomerService) {}

  ngOnInit(): void {

   //this.getCustomers()

  }

  registercustomer(){
    console.log(this.customerForm)

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

    console.log(` CUSTOMER:  ${this.customer}`)
    console.log(`${this.customerForm.controls.name.value}`)

    this.service.addCustomer(this.customer).subscribe((response) => {
      console.log(`Response: ${response}`)
      this.customer = response
    })
    console.log(`RETURN: ${this.customer}`)

    this.customerForm.reset()
  }


  /*getCustomers(){
    this.service.getCustomers().subscribe((customers) => {

      this.customers = customers
    
      console.log(customers[0].name)

      console.log(customers[0].dependents[0])
      console.log(customers[0].dependents[0].name)


    })
  }*/
  

      }


  



