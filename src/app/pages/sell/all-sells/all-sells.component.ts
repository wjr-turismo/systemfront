import { Component, OnInit } from '@angular/core';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';
import { registerLocaleData } from '@angular/common'
import localeBr from '@angular/common/locales/br'
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData } from 'src/app/models/employeeData';
import { environment } from 'src/environments/environment';
import { DatesFilterRequest } from 'src/app/models/DatesFilterRequest';
registerLocaleData(localeBr,'br')

@Component({
  selector: 'app-all-sells',
  templateUrl: './all-sells.component.html',
  styleUrls: ['./all-sells.component.css']
})
export class AllSellsComponent implements OnInit {

  dateFrom: string = `${environment.year}-${environment.month}-01`
  dateTo: string = `${environment.year}-${environment.month}-${environment.day}`

  sells: SellData[]  = []
  sellsFiltered: SellData[] = []

  sella:any[] = []

  employees!:EmployeeData[] |any
  employee!:any

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  page:number = 0;

  isMoreShown:boolean = true

  constructor(private service: SellService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getSells()
    this.getEmployees()
  }


  getSells(){

    this.service.getAllSells(this.page).subscribe((response) => {

      

      response.forEach((a) => {
        this.sells.push(a)
        this.sellsFiltered.push(a);
        
      })
     // this.sellsFiltered = response


      if(Object.keys(response).length != 0){
        this.page += 1;
      }else{
        alert('Todos os dados foram carregados')
      }

      //this.sellsFiltered = this.sellsFiltered.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    })

  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe((employess) => {

      this.employees = employess
      console.log(employess)

    })
  }

  dateFilter(){
    
    this.isMoreShown = false;
    console.log(`SELECTED: ${this.employee}`)

    //this.sellsFiltered = []

    if(this.dateFrom==null || this.dateTo==null || this.employee==null){
      alert('Selecione as datas para filtrar!')
      return
    }
    
    if(this.dateFrom!=null && this.dateTo!=null){
      this.totalSells = 0
     this.totalRAV = 0
     this.totalCommission = 0
    }

    var from = new Date(Date.parse(`${this.dateFrom}T01:00:00.023-03:00`));
    var to = new Date(Date.parse(`${this.dateTo}T23:00:00.023-03:00`));

    var dates: DatesFilterRequest = {startDate:from, endDate:to};

    console.log(`FROM: ${from}`)
    console.log(`TO: ${to}`)
    console.log(`EMAIL: ${this.employee}`)

    console.log(dates);

     this.service.getSellsFiltered(dates,this.employee).subscribe((response) => {
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
    
    this.sellsFiltered = [];
    this.employee = null;
    this.page = 0;
    this.totalSells = 0;
    this.totalRAV = 0;
    this.totalCommission = 0;
    console.log(`Page: ${this.page}`);
    this.isMoreShown=true;
    this.getSells();
    
  }


}
