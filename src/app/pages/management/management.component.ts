import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}
  isEmployeeShown:boolean = false
  isCustomerShown:boolean = true

  

  constructor() { }

  ngOnInit(): void {
  }

  toogle(cat:string){

    switch (cat){
      case "cus":
        this.isCustomerShown = true
        this.isEmployeeShown= false
        break
      case "empl":
       this.isCustomerShown = false
        this.isEmployeeShown= true
    }
    

  }

}
