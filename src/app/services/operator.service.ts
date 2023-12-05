import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { operatorData } from '../models/operatorData';
import { environment } from 'src/environments/environment';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  operators!: operatorData | any
  operator!: operatorData | any
  baseUrl!: string

  constructor(private http: HttpClient, private guard: AuthGuardService) { 

    this.baseUrl = environment.baseUrl

  }

  getOperators():Observable<operatorData>{

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

    this.operators = this.http.get<operatorData>(`${this.baseUrl}/operator`,{headers}).pipe(
      catchError((err:any,caught:Observable<operatorData>) => {
          console.log(err)
          if(err.status==403){
            localStorage.clear()
            this.guard.canActivate()
          }
          return caught
      })
    )
        return this.operators
  }

  getOperator(id:number):Observable<operatorData>{
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    this.operator = this.http.get<operatorData>(`${this.baseUrl}/operator/getoperator/${id}`, { headers }).pipe(
      catchError((err:any, caught: Observable<operatorData>) => {
        return caught

      })
    )
      return this.operator
  }

  addOperator(operator:operatorData):Observable<operatorData>{

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

    this.operator = this.http.post<operatorData>(`${this.baseUrl}/operator`,operator,{headers}).pipe(
        catchError((err:any,caught:Observable<operatorData>) => {
            return caught
        })
    )
        return this.operator

  }



}
