import { Component, OnInit } from '@angular/core';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';
import { registerLocaleData } from '@angular/common'
import localeBr from '@angular/common/locales/br'
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData } from 'src/app/models/employeeData';
registerLocaleData(localeBr,'br')

@Component({
  selector: 'app-all-sells',
  templateUrl: './all-sells.component.html',
  styleUrls: ['./all-sells.component.css']
})
export class AllSellsComponent implements OnInit {

  dateFrom!: Date
  dateTo!: Date

  sells!: SellData[] | any
  sellsFiltered!: SellData[] | any

  employees!:EmployeeData[] |any
  employee:string = ""

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  constructor(private service: SellService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getSells()
    this.getEmployees()
  }


  getSells(){
    this.service.getAllSells().subscribe((response) => {

      this.sells = response
      this.sellsFiltered  = response

      for (let i = 0; i < response.length; i++) {
        this.totalSells += response[i].sellAmount;
        this.totalRAV += response[i].rav;
      }

      this.calcCommission(this.totalSells)
    
    })
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe((employess) => {

      this.employees = employess
      console.log(employess)

    })
  }

  dateFilter(){
    
    console.log(`Employee: ${this.employee}`)

    this.sellsFiltered = []

    if(this.dateFrom==null || this.dateTo==null){
      alert('Selecione as datas para filtrar!')
    }
    
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

      if(this.employee != ""){
        if(this.employee == this.sells[i].employeeName){
          this.sellsFiltered.push(this.sells[i])
          this.totalSells += this.sells[i].sellAmount;
          this.totalRAV += this.sells[i].rav;
        }
      }else{
        this.sellsFiltered.push(this.sells[i])
        this.totalSells += this.sells[i].sellAmount;
        this.totalRAV += this.sells[i].rav;
      }

    }

   }

   this.calcCommission(this.totalSells)

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
