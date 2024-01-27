import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  nav_var=true

  packages!:any

  constructor(private service: PackagesService) { 
    window.addEventListener("scroll",this.bg)
  }

  ngOnInit(): void {
    this.getPackages()
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

  getPackages(){
    this.service.getPackages().subscribe((response) => {
      this.packages = response;
      console.log(this.packages);
    })
  }

}
