import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/loginData';
import { LoginResponseData } from 'src/app/models/loginResponseData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sct!: string
  loginResponse!: LoginResponseData
  login: LoginData | any


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)

  }) 

  constructor(private service:LoginService, private guard: AuthGuardService, private router: Router) {
    this.sct = environment.sct

   }

  ngOnInit(): void {
  }

  doLogin(){

    if(this.loginForm.invalid) return alert(`Verifique seu email e senha`);

    this.login = {
      "email":this.loginForm.value.email,
      "password":this.loginForm.value.password
    }

    this.service.login(this.login). subscribe((response) => {
        console.log(`response: ${response.name}`)
        this.loginResponse = {
          name: response.name,
          role: response.role,
          token: response.token,
          loggedIn : response.loggedIn,
          email: response.email,
          expDate: response.expDate
        }

        if(this.loginResponse.token.split(".")[0]== this.sct){
          localStorage.setItem('token',this.loginResponse.token)
          localStorage.setItem('user',this.loginResponse.name)
          localStorage.setItem('role',this.loginResponse.role)
          localStorage.setItem('email',this.loginResponse.email)
          environment.email = this.loginResponse.email;

          environment.expDate = this.loginResponse.expDate;

          //this.guard.canActivate(this.loginResponse.loggedIn)
          //window.location.assign('/homesystem')
          this.router.navigate(['homesystem'])
        }

    })
  }

}
