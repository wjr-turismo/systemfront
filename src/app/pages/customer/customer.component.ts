import { Component, OnInit } from '@angular/core';
import { customerData } from '../../models/customerData'
import { CustomerService } from '../../services/customer.service'
import { LoginResponseData } from 'src/app/models/loginResponseData';
import { LoginData } from 'src/app/models/loginData';
import { LoginService } from 'src/app/services/login.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers!: customerData[]
  customer!: customerData

  loginResponse!: LoginResponseData
  login!: LoginData |any

  constructor(private service: LoginService,private a: CustomerService) { }

  ngOnInit(): void {

    console.log("asd")

    //this.login.email = "amsasx@gmail.com"
    //this.login.password = "1313454"
  

    this.doLogin({email:"amsasx@gmail.com",password:"1313454"})
   //this.getCustomers()

  }

  /*getCustomers(){
    this.service.getCustomers().subscribe((customers) => {

      console.log(customers[0].name)

      console.log(customers[0].dependents[0])
      console.log(customers[0].dependents[0].name)


    })
  }
  */

  doLogin(lo: any){

      this.service.login(lo). subscribe((response) => {
          console.log(`response: ${response.name}`)

          
          this.loginResponse = {
            name: response.name,
            role: response.role,
            token: response.token
          }
          console.log(this.loginResponse)

      })

      }

  }



