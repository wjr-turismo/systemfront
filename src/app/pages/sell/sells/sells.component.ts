import { Component, Input, OnInit } from '@angular/core';
import { DatesFilterRequest } from 'src/app/models/DatesFilterRequest';
import { SellData } from 'src/app/models/sellData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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

  page:number = 0;
  pagefilter:number = 0

  exp:any

  constructor(private service: SellService, private guard: AuthGuardService) { }

  ngOnInit(): void {
    this.getSells()
    this.dateFilter()
    
    console.log(`From: ${this.dateFrom}`)
    console.log(`To: ${this.dateTo}`)


  }


  /*getSells(){

    this.service.getSells().subscribe((response) => {

      console.log(`RESPONSE: ${response}`)

      this.sells = response
      

      for (let i = 0; i < response.length; i++) {
        this.totalSells += response[i].sellAmount;
        this.totalRAV += response[i].rav;
        console.log(new Date(Date.parse(`${response[i].date}`)))
      }
      
    })

  }*/

  getSells(){

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }

    this.service.getAllSells(this.page).subscribe((response) => {

      
      console.log("RESPONSE SIZE: " + Object.keys(response.sells).length )


      if(Object.keys(response.sells).length != 0){
        
        response.sells.forEach(a => this.sells.push(a));

        this.totalSells += response.totalSells;
        this.totalRAV += response.totalRAV;

        this.totalCommission = this.calcCommission(this.totalSells);

        this.page += 1;
      }else{
        alert('Todos os dados foram carregados')
      }

      //this.sellsFiltered = this.sellsFiltered.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    })

  }

  

  dateFilter(){

    var from = new Date(Date.parse(`${this.dateFrom}T01:00:00.023-03:00`));
    var to = new Date(Date.parse(`${this.dateTo}T23:00:00.023-03:00`));

    var dates: DatesFilterRequest = {startDate:from, endDate:to, employeeId: localStorage.getItem('id')};

    console.log(`FROM: ${from}`)
    console.log(`TO: ${to}`)
    console.log(`EMAIL: ${environment.email}`)

    console.log(dates);

    this.service.getSellsFiltered(dates,0).subscribe((response) => {
      console.log("RESPOSTA FILTRADA:")
      console.log(response)

      this.sellsFiltered = response.sells;
      this.totalSells = response.totalSells;
      this.totalRAV = response.totalRAV;

      this.totalCommission = this.calcCommission(this.totalSells);
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

  calcCommission(totsells:number):number{
    if(totsells>=40000 && totsells<60000){
      return this.totalRAV*0.04;
      
     }
     else if(totsells>=60000 && totsells<80000){
      return this.totalRAV*0.06;
      
     }
     else if(totsells>=80000 && totsells<100000){
      return this.totalRAV*0.08;
      
     }
     else if(totsells>=100000){
      return this.totalRAV*0.10;
      
     }else{
      return 0;
     }
  
  }

  selectSell(sell:any){
      console.log(sell)
  }

  clean(){
    this.sellsFiltered = this.sells
  }

}
