import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { PackagesService } from 'src/app/services/packages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  exp:any
  packages!: any

  constructor(private service: PackagesService, private guard: AuthGuardService) { 

    this.exp = new Date(environment.baseUrl);

  }

  ngOnInit(): void {

    if (this.exp < new Date()) {
      
      localStorage.clear();
      this.guard.canActivate();
    }else{
      this.getPackages()
    }

    
  }


  getPackages(){
    this.service.getPackages().subscribe((response) => {

      this.packages = response;
      


    })
  }

  selected(id:number){
    
    console.log(id)
    environment.idAux = id;

  }

}
