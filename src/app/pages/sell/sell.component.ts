import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}

  addSellIsShown:boolean = true
  allSellsIsShown:boolean = false
  sellsIsShown:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toogle(option:string){

  switch(option){

    case 'sell':
      this.addSellIsShown = true
      this.allSellsIsShown = false
      this.sellsIsShown = false
      break

    case 'sells':
      this.addSellIsShown = false
      this.allSellsIsShown = false
      this.sellsIsShown = true
      break
    
    case 'allsells':
      this.addSellIsShown = false
      this.allSellsIsShown = true
      this.sellsIsShown = false

  }

  }
}
