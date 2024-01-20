import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate():boolean{
    if(localStorage.getItem('token')?.split('.')[0]==environment.sct){
        return true
        
    }
    this.router.navigate(['login'])
    return false
    
  }
}
