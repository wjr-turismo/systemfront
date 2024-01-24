import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  nav_var=true

  constructor() { 
    window.addEventListener("scroll",this.bg)
  }

  ngOnInit(): void {
  }

  bg(){
    
    var nav = document.getElementById('navbar')
    var scroolValue = window.scrollY;
    console.log(scroolValue);

    if(scroolValue > 200){
      nav?.classList.remove('navbg');
      nav?.classList.add('navbgdown');
      nav?.classList.replace('navbg','navbgdown');
    }else{
      nav?.classList.replace('navbgdown','navbg'); 
    }

  }


}
