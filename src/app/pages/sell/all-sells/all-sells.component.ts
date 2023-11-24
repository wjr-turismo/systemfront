import { Component, OnInit } from '@angular/core';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';
import { registerLocaleData } from '@angular/common'
import localeBr from '@angular/common/locales/br'
registerLocaleData(localeBr,'br')

@Component({
  selector: 'app-all-sells',
  templateUrl: './all-sells.component.html',
  styleUrls: ['./all-sells.component.css']
})
export class AllSellsComponent implements OnInit {

  sells!: SellData[] | any

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  constructor(private service: SellService) { }

  ngOnInit(): void {
    this.getSells()
  }


  getSells(){
    this.service.getAllSells().subscribe((response) => {

      console.log(`RESPONSE: ${response}`)

      this.sells = response

      

      for (let i = 0; i < response.length; i++) {
        this.totalSells += response[i].sellAmount;
        this.totalRAV += response[i].rav;
        this.totalCommission += response[i].commission;
        
      }
    
    })
  }


  print(a:any){
    console.log(a)
  }




}
