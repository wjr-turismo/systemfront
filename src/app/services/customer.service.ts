import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { customerData } from '../models/customerData'
import { Observable, catchError } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl!:string
  customers!: customerData[] |any
  customer!: customerData | any


  constructor(private http:HttpClient, private guard: AuthGuardService) {
      this.baseUrl = environment.baseUrl
   }

   getCustomers():Observable<customerData>{
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    this.customers = this.http.get<customerData>(`${this.baseUrl}/customer`,{headers}).pipe(
        catchError((err:any , caught: Observable<customerData>) => {
          console.log(err)

                if(err.status==403){
          localStorage.clear()
          this.guard.canActivate()
        }

          return caught
        }

      ))
        return this.customers
   }

   addCustomer(customer:customerData): Observable<customerData>{
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    this.customer = this.http.post<customerData>(`${this.baseUrl}/customer`,customer,{headers}).pipe(
      catchError((err:any, caught: Observable<customerData>) => {
                            console.log(err)
                            return caught
                      }) 
                      )
                    return this.customer
   }


}
