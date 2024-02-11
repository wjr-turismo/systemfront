import { Component, OnInit } from '@angular/core';
import { customerData } from 'src/app/models/customerData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { CustomerService } from 'src/app/services/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers!: customerData[] |any
  customer!: customerData | any

  isTableShown:boolean=true

  exp:any

  buttonText:string =  "Adicionar Cliente"

  constructor(private service: CustomerService, private guard: AuthGuardService) {
    this.exp = new Date(environment.expDate);
   }

  ngOnInit(): void {

    console.log(this.exp > new Date())
    
    if (this.exp < new Date()) {
      console.log("AAAA")
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getCustomers()
    }


    
  }


  getCustomers(){
    this.service.getCustomers().subscribe((response)=>{
      console.log(response)
      this.customers = response


      
    })
  }

  toogle(){
    this.isTableShown = !this.isTableShown

    if(!this.isTableShown){
      this.buttonText = "Listar Clientes"
    }else{
      this.buttonText = "Adicionar Cliente"
    }
  }

  print(a:any){
    console.log(a)
    environment.idAux  = a
  }


}
