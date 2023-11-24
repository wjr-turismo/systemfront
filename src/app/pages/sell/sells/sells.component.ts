import { Component, OnInit } from '@angular/core';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-sells',
  templateUrl: './sells.component.html',
  styleUrls: ['./sells.component.css']
})
export class SellsComponent implements OnInit {

  sells!: SellData[] | any

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

      for (let i = 0; i < response.length; i++) {
        this.totalSells += response[i].sellAmount;
        this.totalRAV += response[i].rav;
        this.totalCommission += response[i].commission;
        
        console.log(response[i].sellAmount)
      }
      

    })

  }


}
