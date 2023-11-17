import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from 'src/app/models/loginData';
import { LoginResponseData } from 'src/app/models/loginResponseData';

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

  constructor(private service:LoginService) {
    this.sct = environment.sct

    this.loginForm.valueChanges.subscribe((values)=> {
      console.log(values)
      console.log(values.password)
      this.login = values
      console.log(`login atualizando ${this.login}`)
    })
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
          loggedIn : response.loggedIn
        }

        if(this.loginResponse.token.split(".")[0]== this.sct){
          localStorage.setItem('token',this.loginResponse.token)
          window.location.assign('/customer')
        }
        console.log(this.loginResponse)

        console.log(response.token.split(".")[0])

    })
  }

  print(){
    
    
 }
}
