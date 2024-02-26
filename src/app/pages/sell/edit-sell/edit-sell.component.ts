import { Component, Input, SimpleChange } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { operatorData } from 'src/app/models/operatorData';
import { SellData } from 'src/app/models/sellData';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { OperatorService } from 'src/app/services/operator.service';
import { SellService } from 'src/app/services/sell.service';


@Component({
  selector: 'app-edit-sell',
  templateUrl: './edit-sell.component.html',
  styleUrls: ['./edit-sell.component.css']
})
export class EditSellComponent {

  sellForm = new FormGroup({
    operator: new FormControl(),
    bookingNumber: new FormControl(),
    sellAmount: new FormControl(),
    rav: new FormControl(),
    overBonus: new FormControl()

  })

  operators!: operatorData | any

  exp:any

  isEditEnabled: boolean = false;

  isSaveEditedShown: boolean = false;

  @Input()
  sellToBeEdited!: SellData


  constructor(private operatorService: OperatorService, private sellService: SellService , private guard: AuthGuardService, private router: Router){
    
  }


  ngOnInit(){

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getOperators()
    }

   // this.sell = environment.sell; 
   this.sellForm.disable();

  }


  getOperators(){
    this.operatorService.getOperators().subscribe((response) => {

      this.operators = response
      console.log(this.operators)

      
    })
  }

  updateSell(){

    console.log(this.sellForm);

    this.sellToBeEdited = {
      id: this.sellToBeEdited.id,
      operator: this.sellForm.controls.operator.value,
      bookingNumber: this.sellForm.controls.bookingNumber.value,
      sellAmount: this.sellForm.controls.sellAmount.value,
      rav: this.sellForm.controls.rav.value,
      commission: this.sellToBeEdited.commission,
      date: this.sellToBeEdited.date,
      overBonus: this.sellForm.controls.overBonus.value,
      sellerBonus: this.sellToBeEdited.sellerBonus,
      managerBonus: 0,
      empId: this.sellToBeEdited.empId,
      empName: this.sellToBeEdited.empName
    }

    console.log(this.sellToBeEdited)

    this.sellService.putSell(this.sellToBeEdited).subscribe((response) => {
      console.log(response)
      this.router.navigate(['homesystem'])
    })

    

  }


  deleteSell(){

    const value = confirm("Tem certeza que deseja deletar esta venda?")

    if(value){
      this.sellService.deleteSell(this.sellToBeEdited.id).subscribe((res) => {
        console.log(res);
      });

      this.router.navigate(['homesystem'])
    }

  }

  fillSellData(){

    this.sellForm.controls.operator .setValue(this.sellToBeEdited.operator)
    this.sellForm.controls.bookingNumber .setValue(this.sellToBeEdited.bookingNumber)
    this.sellForm.controls.sellAmount.setValue(this.sellToBeEdited.sellAmount);
    this.sellForm.controls.rav.setValue(this.sellToBeEdited.rav);
    this.sellForm.controls.overBonus.setValue(this.sellToBeEdited.overBonus);

  }

  toogleSaveEditButton(){

    this.isSaveEditedShown = !this.isSaveEditedShown;
    this.isEditEnabled = !this.isEditEnabled;

    
      this.sellForm.controls.bookingNumber.enable();
      this.sellForm.controls.sellAmount.enable();
      this.sellForm.controls.rav.enable();
      this.sellForm.controls.overBonus.enable();
      this.sellForm.controls.operator.enable();
      this.fillSellData();

  }






  

}
