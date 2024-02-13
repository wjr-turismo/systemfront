import { Component, Input, OnInit } from '@angular/core';
import { DatesFilterRequest } from 'src/app/models/DatesFilterRequest';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.css']
})
export class SellsComponent implements OnInit {

  
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role'),email:localStorage.getItem('email')}

  
  dateFrom: string = `${environment.year}-${environment.month}-01`
  dateTo: string = `${environment.year}-${environment.month}-${environment.day}`

  datesFilter!: DatesFilterRequest
  sells!: SellData[] | any
  sellsFiltered!: SellData[] | any

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  constructor(private service: SellService) { }

  ngOnInit(): void {
    //this.getSells()
    this.dateFilter()
    
    console.log(`From: ${this.dateFrom}`)
    console.log(`To: ${this.dateTo}`)


  }


  getSells(){

    this.service.getSells().subscribe((response) => {

      console.log(`RESPONSE: ${response}`)

      this.sells = response
      

      for (let i = 0; i < response.length; i++) {
        this.totalSells += response[i].sellAmount;
        this.totalRAV += response[i].rav;
        console.log(new Date(Date.parse(`${response[i].date}`)))
      }
      
    })

  }

  dateFilter(){

    var from = new Date(Date.parse(`${this.dateFrom}T01:00:00.023-03:00`));
    var to = new Date(Date.parse(`${this.dateTo}T23:00:00.023-03:00`));

    var dates: DatesFilterRequest = {startDate:from, endDate:to};

    console.log(`FROM: ${from}`)
    console.log(`TO: ${to}`)
    console.log(`EMAIL: ${environment.email}`)

    console.log(dates);

    this.service.getSellsFiltered(dates,environment.email).subscribe((response) => {
      console.log("RESPOSTA FILTRADA:")
      console.log(response)

      this.sellsFiltered = response.sells;
      this.totalSells = response.totalSells;
      this.totalRAV = response.totalRAV;

      this.calcCommission(this.totalSells);
    })



   /*for (let i = 0; i < this.sells.length; i++) {
    var day = new Date(Date.parse(`${this.sells[i].date}`))

    if(day >= from && day<= to){
      
      this.sellsFiltered.push(this.sells[i])
    
      this.totalSells += this.sells[i].sellAmount;
      this.totalRAV += this.sells[i].rav;
      
    }

   }

   this.calcCommission(this.totalSells)*/


  }

  calcCommission(totsells:number){
    if(totsells>=40000 && totsells<60000){
      this.totalCommission = this.totalRAV*0.04;
      console.log('4%')
     }
     else if(totsells>=60000 && totsells<80000){
      this.totalCommission = this.totalRAV*0.06;
      console.log('6%')
     }
     else if(totsells>=80000 && totsells<100000){
      this.totalCommission = this.totalRAV*0.08;
      console.log('8%')
     }
     else if(totsells>=100000){
      this.totalCommission = this.totalRAV*0.10;
      console.log('10%')
     }else{
      this.totalCommission=0;
     }
  
  }

  selectSell(sell:any){
      console.log(sell)
  }

  clean(){
    this.sellsFiltered = this.sells
  }

}
