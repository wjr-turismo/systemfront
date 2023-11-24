import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}


  constructor() { }

  ngOnInit(): void {
  }

  toogle(option:string){

  }
}
