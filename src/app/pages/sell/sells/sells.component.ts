import { Component, Input, OnInit } from '@angular/core';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.css']
})
export class SellsComponent implements OnInit {

  dateFrom!: Date
  dateTo!: Date
  sells!: SellData[] | any
  sellsFiltered!: SellData[] | any

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  constructor(private service: SellService) { }

  ngOnInit(): void {
    this.getSells()
  }


  getSells(){

    this.service.getSells().subscribe((response) => {

      console.log(`RESPONSE: ${response}`)

      this.sells = response
      this.sellsFiltered  = response

      for (let i = 0; i < response.length; i++) {
        this.totalSells += response[i].sellAmount;
        this.totalRAV += response[i].rav;
        console.log(new Date(Date.parse(`${response[i].date}`)))
      }
      this.calcCommission(this.totalRAV)
    })

  }

  dateFilter(){
    
    this.sellsFiltered = []
    
    if(this.dateFrom!=null && this.dateTo!=null){
      this.totalSells = 0
     this.totalRAV = 0
     this.totalCommission = 0
    }

    let from = new Date(Date.parse(`${this.dateFrom}T01:00:00.023-03:00`))
    let to = new Date(Date.parse(`${this.dateTo}T23:00:00.023-03:00`))


   for (let i = 0; i < this.sells.length; i++) {
    var day = new Date(Date.parse(`${this.sells[i].date}`))

    if(day >= from && day<= to){
      
      this.sellsFiltered.push(this.sells[i])
    
      this.totalSells += this.sells[i].sellAmount;
      this.totalRAV += this.sells[i].rav;
      
    }

   }

   this.calcCommission(this.totalRAV)

  }

  calcCommission(rav:number){
    if(rav>=4000 && rav<6000){
      this.totalCommission = rav*0.04;
      console.log('4%')
     }
     else if(rav>=6000 && rav<8000){
      this.totalCommission = rav*0.06;
      console.log('6%')
     }
     else if(rav>=8000 && rav<10000){
      this.totalCommission = rav*0.08;
      console.log('8%')
     }
     else if(rav>=10000){
      this.totalCommission = rav*0.10;
      console.log('10%')
     }
  
  }

  selectSell(sell:any){
      console.log(sell)
  }

  clean(){
    this.sellsFiltered = this.sells
  }

}
