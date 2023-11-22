import { Component, OnInit } from '@angular/core';
import { customerData } from '../../models/customerData'
import { CustomerService } from '../../services/customer.service'
import { environment } from 'src/environments/environment';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers!: customerData[]
  customer!: customerData


  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}


 

  sct!:string

  constructor(private service: CustomerService, private guard:AuthGuardService) {this.sct = environment.sct }

  ngOnInit(): void {

   //this.getCustomers()

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


  



