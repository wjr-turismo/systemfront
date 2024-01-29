import { Component, OnInit } from '@angular/core';
import { PackagesService } from 'src/app/services/packages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  packages!: any

  constructor(private service: PackagesService) { }

  ngOnInit(): void {
    this.getPackages()
  }


  getPackages(){
    this.service.getPackages().subscribe((response) => {

      this.packages = response;
      console.log(this.packages);


    })
  }

  selected(id:number){
    
    console.log(id)
    environment.idAux = id;
    environment.pack = this.packages[id-1];

  }

}
