import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { LoginResponseData } from '../models/loginResponseData'
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  baseUrl!:string

  loginResponse!: LoginResponseData | any

  constructor(private http: HttpClient) { 

    this.baseUrl = environment.baseUrl

  }

  login(login:any):Observable<LoginResponseData>{
   
    this.loginResponse = this.http.post<LoginResponseData>(`${this.baseUrl}/auth/login`,login).pipe(
      catchError((err:any, caught: Observable<LoginResponseData>) => {
        console.log(`login: ${login}`)
        console.log(err.status)

        if(err.status==403) window.alert("Verifique seu Login!")
        
        return err
      })
    )
    console.log(`Service response: ${this.loginResponse}`)
    console.log(this.loginResponse.status)
    
    return this.loginResponse
  }


}
