import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LoginResponseData } from '../models/loginResponseData'
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl:string

  loginResponse!: LoginResponseData | any

  constructor(private http: HttpClient) { 

    this.baseUrl = environment.baseUrl

  }

  login(login:any):Observable<LoginResponseData>{
    this.loginResponse = this.http.post(`${this.baseUrl}login`,login).pipe(
      catchError((err:any, caught: Observable<LoginResponseData>) => {
        console.log(err)
        return caught
      })
    )
    return this.loginResponse
  }


}
