import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-homesystem',
  templateUrl: './homesystem.component.html',
  styleUrls: ['./homesystem.component.css']
})
export class HomesystemComponent implements OnInit {

  time: any
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}


  constructor(private guard: AuthGuardService) { }

  ngOnInit(): void {

    console.log("asd")

    window.onload = (() => this.idleLogout())
  }


  idleLogout(){
    let now = new Date()
    let end = new Date()
    end.setMinutes(now.getMinutes() + 1)

    let left:number =  (end.getMinutes()-now.getMinutes())*1000*60

    console.log(left)


    let idletime = 60*60*1000
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
