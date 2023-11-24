import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellData } from '../models/sellData';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  sells!: SellData[] | any
  baseurl!: string

  constructor(private http: HttpClient) { 
    this.baseurl = environment.baseUrl
  }


  getAllSells():Observable<SellData[]>{

    const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    this.sells = this.http.get<SellData[]>(`${this.baseurl}/sell`,{headers}).pipe(
      catchError((err:any,caught:Observable<SellData[]>) => {
        console.log(err)
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
        return caught
    })
    )
       return this.sells
  }


  addSell(sell:SellData):Observable<SellData[]>{
    const headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    this.sells = this.http.post<SellData[]>(`${this.baseurl}/sell`,sell,{headers}).pipe(
      catchError((err:any,caught:Observable<SellData[]>) => {
        console.log(err)
        return caught
    })
    )
       return this.sells
  }


}
