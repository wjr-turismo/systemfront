import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { customerData } from '../models/customerData'
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl!:string
  customers!: customerData[]
  customer!: customerData


  constructor(private http:HttpClient) {
      this.baseUrl = environment.baseUrl
   }

   getCustomers():Observable<customerData[]>{

      return this.http.get<customerData[]>(`${this.baseUrl}/customer`).pipe(
        catchError((err:any , caught: Observable<customerData[]>) => {
          console.log(err)
          return caught
        }

      ))

   }


}
