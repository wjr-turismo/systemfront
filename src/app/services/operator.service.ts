import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { operatorData } from '../models/operatorData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  operators!: operatorData | any
  operator!: operatorData | any
  baseUrl!: string

  constructor(private http: HttpClient) { 

    this.baseUrl = environment.baseUrl

  }

  getOperators():Observable<operatorData>{

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

    this.operators = this.http.get<operatorData>(`${this.baseUrl}/operator`,{headers}).pipe(
      catchError((err:any,caught:Observable<operatorData>) => {
          console.log(err)
          return caught
      })
    )
        return this.operators
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
