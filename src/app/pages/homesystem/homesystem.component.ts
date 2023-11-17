import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-homesystem',
  templateUrl: './homesystem.component.html',
  styleUrls: ['./homesystem.component.css']
})
export class HomesystemComponent implements OnInit {

  time: any


  constructor(private guard: AuthGuardService) { }

  ngOnInit(): void {

    console.log("asd")

    window.onload = (() => this.idleLogout())
  }


  idleLogout(){

    let idletime = 4000
    window.onload = (()=> this.resetTimer(idletime))
    document.onmousemove = (()=> this.resetTimer(idletime))
    document.onkeyup = (()=> this.resetTimer(idletime))
  }

  resetTimer(out:number){

    console.log("Reseting Timer")
    let timer = clearTimeout(this.time)
  
      this.time = setTimeout(() => {
        localStorage.clear()
        this.guard.canActivate()
        
      }, out)
    


  }

}
