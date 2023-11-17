import { Component, OnInit } from '@angular/core';
import { customerData } from '../../models/customerData'
import { CustomerService } from '../../services/customer.service'
import { LoginResponseData } from 'src/app/models/loginResponseData';
import { LoginData } from 'src/app/models/loginData';
import { catchError, timeout } from 'rxjs';
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
  time: any

  user = localStorage.getItem('user')

 

  sct!:string

  constructor(private a: CustomerService, private guard:AuthGuardService) {this.sct = environment.sct }

  ngOnInit(): void {

    console.log("asd")

    window.onload = (() => this.idleLogout())

  }

  idleLogout(){

    let idletime = 60*1000
    window.onload = (()=> this.resetTimer(idletime))
    document.onmousemove = (()=> this.resetTimer(idletime))
    document.onkeyup = (()=> this.resetTimer(idletime))
  }

  resetTimer(out:number){

    console.log("Reseting Timer")
    let timer = clearTimeout(this.time)
  
      this.time = setTimeout(() => {
        localStorage.clear()
        this.guard.canActivate()
        
      }, out)
    


  }

  /*getCustomers(){
    this.service.getCustomers().subscribe((customers) => {

      console.log(customers[0].name)

      console.log(customers[0].dependents[0])
      console.log(customers[0].dependents[0].name)


    })
  }
  */


      }


  



