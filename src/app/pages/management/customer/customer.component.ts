import { Component, OnInit } from '@angular/core';
import { customerData } from '../../../models/customerData'
import { CustomerService } from '../../../services/customer.service'
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  isDisable: boolean = true

  customer!: customerData|any

  customers!: customerData[]
  
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role'),email:localStorage.getItem('email')}

  sct!:string

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {

   this.getCustomer()

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

      alert(`Cliente ${response.name} cadastrado com sucesso!`)
      this.router.navigate(['management'])
    })

    this.customerForm.reset()
  }


  getCustomer(){
    this.service.getCustomer(environment.idAux).subscribe((customer) => {

      this.customer= customer


    })
  }

  editCustomer(){
    this.isDisable = false
    
    this.customerForm.controls.name.setValue(this.customer.name)
    this.customerForm.controls.cpf.setValue(this.customer.cpf)
    this.customerForm.controls.rg.setValue(this.customer.rg)
    this.customerForm.controls.birth.setValue(this.customer.birth)
    this.customerForm.controls.email.setValue(this.customer.email)
    this.customerForm.controls.places.setValue(this.customer.places)
    this.customerForm.controls.tripDates.setValue(this.customer.tripDates)
    this.customerForm.controls.namedep1.setValue(this.customer.dependents[0].name)
    this.customerForm.controls.descriptiondep1.setValue(this.customer.dependents[0].description)
    this.customerForm.controls.rgdep1.setValue(this.customer.dependents[0].rg)
    this.customerForm.controls.cpfdep1.setValue(this.customer.dependents[0].cpf)
    this.customerForm.controls.whats.setValue(this.customer.phone[0].whats)
    this.customerForm.controls.personal.setValue(this.customer.phone[0].personal)
       
  }

  putCustomer(){
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

    this.service.putCustomer(this.customer,environment.idAux).subscribe((response)=>{
      this.customer = response
      alert(`Cliente ${this.customer.name} atualizado com sucesso!`)
      this.router.navigate(['management'])
    })


  }

  deleteCustomer(id:number){
    this.service.deleteCustomer(id).subscribe((response) => {
      this.customer = response

      alert(`Cliente ${this.customer.name} removido com sucesso!`)
      this.router.navigate(['management'])
      
    })
  }

  disable(){
    this.isDisable = true
  }
  

}


  



