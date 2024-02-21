import { Component, OnInit } from '@angular/core';
import { SellData } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';
import { registerLocaleData } from '@angular/common'
import localeBr from '@angular/common/locales/br'
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData } from 'src/app/models/employeeData';
import { environment } from 'src/environments/environment';
import { DatesFilterRequest } from 'src/app/models/DatesFilterRequest';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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
  employee:any

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  page:number = 0;

  isMoreShown:boolean = true

  exp:any

  constructor(private service: SellService, private employeeService: EmployeeService, private guard: AuthGuardService) { }

  ngOnInit(): void {
    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getSells()
      this.getEmployees()
    }


  }


  getSells(){

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }

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
    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }

    this.employeeService.getEmployees().subscribe((employess) => {

      this.employees = employess
      console.log(employess)

    })
  }

  dateFilter(){
    
    this.isMoreShown = false;
    

    //this.sellsFiltered = []

    if(this.dateFrom==null || this.dateTo==null || this.employee==null){
      alert('Selecione as datas e colaborador para filtrar!')
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

    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }
    

    if(this.employee=="Todos"){

      this.service.getAllSellsByDates(dates).subscribe((response) => {

  
        this.sellsFiltered = response.sells;
        this.totalSells = response.totalSells;
        this.totalRAV = response.totalRAV;
  
        this.calcCommission(this.totalSells);
      })

    }else{
      this.service.getSellsFiltered(dates,this.employee).subscribe((response) => {

  
        this.sellsFiltered = response.sells;
        this.totalSells = response.totalSells;
        this.totalRAV = response.totalRAV;
  
        this.calcCommission(this.totalSells);
      })

    }

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
    
    this.isMoreShown=true;
    this.getSells();
    
  }


}
