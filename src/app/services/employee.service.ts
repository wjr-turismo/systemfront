import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EmployeeData } from '../models/employeeData'
import { environment } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: EmployeeData[] | any
  employee!: EmployeeData | any
  baseUrl!:string

  constructor(private http: HttpClient) { 

    this.baseUrl = environment.baseUrl

  }

  getEmployees():Observable<EmployeeData>{
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }

    this.employees = this.http.get<EmployeeData>(`${this.baseUrl}/employee`,{headers}).pipe(
      catchError((err:any,caught:Observable<EmployeeData>) => {

        console.log(err)
        return caught

      })
    )
    return this.employees

  }

  addEmployee(employee:EmployeeData):Observable<EmployeeData>{
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    this.employee = this.http.post<EmployeeData>(`${this.baseUrl}/employee`,employee, {headers}).pipe(
        catchError((err:any,caught:Observable<EmployeeData>) => {
          console.log(err)
          return caught
        })
    )
        console.log(this.employee)
        return this.employee
  }


}
