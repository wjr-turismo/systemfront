import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSellRequest, SellData, SellJoinedDataResponse } from '../models/sellData';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from './auth-guard.service';
import { DatesFilterRequest } from '../models/DatesFilterRequest';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  sells!: SellJoinedDataResponse | any
  baseurl!: string

  responseFiltered:any

  constructor(private http: HttpClient, private guard: AuthGuardService) { 
    this.baseurl = environment.baseUrl
  }


  getAllSells(page:number):Observable<SellJoinedDataResponse>{

    const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    this.sells = this.http.get<SellJoinedDataResponse>(`${this.baseurl}/sell?page=${page}&size=5`,{headers}).pipe(
      catchError((err:any,caught:Observable<SellJoinedDataResponse>) => {
        console.log(err)

        if(err.status==403){
          localStorage.clear()
          this.guard.canActivate()
        }

        return caught
    })
    )
       return this.sells
  }

  getSells():Observable<SellData[]>{

    const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    this.sells = this.http.get<SellData[]>(`${this.baseurl}/sell/${localStorage.getItem('email')}`,{headers}).pipe(
      catchError((err:any,caught:Observable<SellData[]>) => {
        console.log(err)
        if(err.status==403){
          localStorage.clear()
          this.guard.canActivate()
        }
        return caught
    })
    )
       return this.sells
  }


  addSell(sell:AddSellRequest): Observable<AddSellRequest>{
    const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    this.sells = this.http.post<AddSellRequest>(`${this.baseurl}/sell`,sell,{headers}).pipe(
      catchError((err:any,caught:Observable<AddSellRequest>) => {
        console.log(err)
        return caught
    })
    )
       return this.sells
  }

getSellsFiltered(filter:DatesFilterRequest, page:number):Observable<SellJoinedDataResponse>{
  
  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}

  var url = `${this.baseurl}/sell/filter`;

  if(filter.employeeId==null && page!=null){
    url +=`?page=${page}&size=5`
  }

  this.responseFiltered = this.http.post<SellJoinedDataResponse>(url,filter,{headers}).pipe(
    catchError( (err:any, caught:Observable<SellJoinedDataResponse>) => {
        console.log(err);
        return caught;
    } )
  )

  return this.responseFiltered;
}


 /*getAllSellsByDates(dates:DatesFilterRequest):Observable<any>{
  const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}

  this.responseFiltered = this.http.post(`${this.baseurl}/sell/filter/dates`,dates,{headers}).pipe(
    catchError( (err:any, caught: Observable<any>) => {
      console.log(err);
      return caught;
    })
  )

  return this.responseFiltered;

}*/

}
