import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { operatorData } from 'src/app/models/operatorData';
import { SellData } from 'src/app/models/sellData';
import { OperatorService } from 'src/app/services/operator.service';
import { SellService } from 'src/app/services/sell.service';

@Component({
  selector: 'app-add-sell',
  templateUrl: './add-sell.component.html',
  styleUrls: ['./add-sell.component.css']
})
export class AddSellComponent implements OnInit {
  sellForm = new FormGroup({
    operator: new FormControl(''),
    bookingNumber: new FormControl(''),
    sellAmount: new FormControl(null,Validators.required),
    rav: new FormControl(null,Validators.required),
    overBonus: new FormControl(null)

  })

  sell: SellData | any
  operators!: operatorData | any


  constructor(private service: SellService, private operatorService: OperatorService) { }

  ngOnInit(): void {
    this.getOperators()
  }


  registersell(){
    
    this.sell = {
      employeeName: localStorage.getItem('name'),
      employeeEmail: localStorage.getItem('email'),
      operator: this.sellForm.controls.operator.value,
      bookingNumber: this.sellForm.controls.bookingNumber.value,
      sellAmount: this.sellForm.controls.sellAmount.value,
      rav: this.sellForm.controls.rav.value,
      commission: null,
      overBonus: this.sellForm.controls.overBonus.value,
      sellerBonus: null,
      managerBonus: null
    }
    console.log(this.sellForm)
    console.log(`Sell: ${this.sell}`)

    this.service.addSell(this.sell).subscribe((response) => {
      console.log(response)
    })



  }

  getOperators(){
    this.operatorService.getOperators().subscribe((response) => {

      console.log(response)
      this.operators = response
      console.log(this.operators)

      
    })
  }

}
