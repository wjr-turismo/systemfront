import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { operatorData } from 'src/app/models/operatorData';
import { AddSellRequest, SellData } from 'src/app/models/sellData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { OperatorService } from 'src/app/services/operator.service';
import { SellService } from 'src/app/services/sell.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-sell',
  templateUrl: './add-sell.component.html',
  styleUrls: ['./add-sell.component.css']
})
export class AddSellComponent implements OnInit {
  sellForm = new FormGroup({
    operator: new FormControl('',Validators.required),
    bookingNumber: new FormControl('',Validators.required),
    sellAmount: new FormControl(null,Validators.required),
    rav: new FormControl(null,Validators.required),
    date: new FormControl(`${environment.year}-${environment.month}-${environment.day}`,Validators.required),
    overBonus: new FormControl(null)

  })

  sell!: AddSellRequest
  operators!: operatorData | any

  date!: Date

  exp:any

  constructor(private service: SellService, private operatorService: OperatorService, private guard: AuthGuardService) { 
    this.exp = environment.expDate;
  }

  ngOnInit(): void {
    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getOperators()
    }

    
  }


  registersell(){
    if(this.sellForm.invalid){
      alert("Verifique os campos!")
      return
    }
    
    var dateParsed = new Date(Date.parse(`${this.sellForm.controls.date.value}T09:00:00.023-03:00`));
    console.log(dateParsed);
    
    this.sell = {
      emplId: Number(localStorage.getItem('id')),
      sell:{
        id: null,
        operator: String(this.sellForm.controls.operator.value),
        bookingNumber: String(this.sellForm.controls.bookingNumber.value),
        sellAmount: Number(this.sellForm.controls.sellAmount.value),
        rav: Number(this.sellForm.controls.rav.value),
        commission: 0,
        overBonus: Number(this.sellForm.controls.overBonus.value),
        sellerBonus: 0,
        managerBonus: 0,
        date: dateParsed,
        empName: "",
        empId: 0
      }
      
    }

    console.log(this.sell);

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }

    this.service.addSell(this.sell).subscribe((response) => {
      alert(`Venda cadastrada com sucesso! Obrigado, ${localStorage.getItem('user')}.`)
    })


    this.sellForm.reset()

  }

  getOperators(){
    this.operatorService.getOperators().subscribe((response) => {

      this.operators = response

      
    })
  }

  printa(){
      console.log(this.date);
      
  }

}
