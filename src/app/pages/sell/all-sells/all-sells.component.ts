import { Component, OnInit } from '@angular/core';
import { AddSellRequest, SellData, SellJoinedDataResponse } from 'src/app/models/sellData';
import { SellService } from 'src/app/services/sell.service';
import { registerLocaleData } from '@angular/common'
import localeBr from '@angular/common/locales/br'
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeData, EmployeesResponse } from 'src/app/models/employeeData';
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


  sellSelected!: SellData 

  sella:any[] = []

  employees!:EmployeesResponse[]
  employeeId:any

  totalSells:number = 0
  totalRAV:number = 0
  totalCommission:number = 0

  page:number = 0;
  pagefilter:number = 0

  isMoreShown:boolean = true
  isMoreFilteredShown:boolean = false

  isEditShown:boolean = false

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

  getEmployees(){
    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }

    this.employeeService.getEmployees().subscribe((employess) => {

      this.employees = employess
      

    })
  }

  dateFilter(){
    
    this.isMoreShown = false;
    this.isMoreFilteredShown = this.check();

    console.log("page " +this.pagefilter)

    console.log(this.employeeId)
    

    if(this.dateFrom==null || this.dateTo==null || this.employeeId==null){
      alert('Selecione as datas e colaborador para filtrar!')
      return
    }

    if(this.pagefilter ==0){
      this.sells =[]
    }
    

    var from = new Date(Date.parse(`${this.dateFrom}T00:00:00.023-03:00`));
    var to = new Date(Date.parse(`${this.dateTo}T23:00:00.023-03:00`));


    if (this.exp < new Date()) {
      localStorage.clear();
      this.guard.canActivate();
      return
    }
    
    var filter!: DatesFilterRequest 

    if(this.employeeId=="Todos"){

    
      filter = {startDate:from, endDate:to, employeeId: null};

      this.service.getSellsFiltered(filter,this.pagefilter).subscribe((response) => {

        if(Object.keys(response.sells).length != 0){
        
          response.sells.forEach(a => this.sells.push(a));
  
          this.totalSells += response.totalSells;
          this.totalRAV += response.totalRAV;
  
          this.totalCommission = this.calcCommission(this.totalSells);
  
          this.pagefilter += 1;
        }else{
          alert('Todos os dados foram carregados')
        }
  
  
      })

    }else{

      filter = {startDate:from, endDate:to, employeeId: this.employeeId};

      this.service.getSellsFiltered(filter,0).subscribe((response) => {

        this.sells = response.sells;
        this.totalSells = response.totalSells;
        this.totalRAV = response.totalRAV
  
        this.totalCommission =  this.calcCommission(this.totalSells);

      })

    }

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

  selectSell(sell:SellData){
      console.log(sell)
      this.sellSelected = sell
      this.isEditShown = !this.isEditShown
  }

  clean(){
    
    this.sells = [];
    this.employeeId = null;
    this.page = 0;
    this.totalSells = 0;
    this.totalRAV = 0;
    this.totalCommission = 0;
    
    this.isMoreShown=true;
    this.getSells();
    
  }

  check():boolean{
    if(!this.isMoreShown && this.employeeId=="Todos"){
      return true;
    }else{
      return false;
    }
  }


  eraseFilterPage(){
    console.log(this.pagefilter)
    this.pagefilter = 0;
    console.log(this.pagefilter)

    this.totalSells = 0;
    this.totalRAV = 0;
    this.totalCommission = 0;


  }


}
