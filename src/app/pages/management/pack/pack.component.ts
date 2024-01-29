import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PackagesService } from 'src/app/services/packages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {

  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role'),email:localStorage.getItem('email')}
  isDisable:boolean = true

  pack!:any

  packForm = new FormGroup({
    city: new FormControl(''),
    country: new FormControl(''),
    price: new FormControl(null),
    days: new FormControl(null),
    nights: new FormControl(null),
    monthTrip: new FormControl(''),
    activities: new FormControl(''),
    imageLink: new FormControl('')
  })

  

  constructor(private service: PackagesService, private router: Router) {
    this.pack = environment.pack;
   }

  ngOnInit(): void {
  }

  putPack(){

    this.pack = {
      city: this.packForm.controls.city.value ,
      country: this.packForm.controls.country.value ,
      price: this.packForm.controls.price.value ,
      days: this.packForm.controls.days.value ,
      nights: this.packForm.controls.nights.value ,
      monthTrip: this.packForm.controls.monthTrip.value ,
      activities: this.packForm.controls.activities.value ,
      imageLink: this.packForm.controls.imageLink.value

    }

    if(environment.idAux!=0){
      this.service.putPackage(this.pack,environment.idAux).subscribe((response) => {

        alert(` Pacote atualizado com sucesso!`)
        this.router.navigate(['management'])
        
        this.pack = response;
        console.log(response);
      })

    }


  }


  editPack(){
    this.isDisable = false

    this.packForm.controls.city.setValue(this.pack.city)
    this.packForm.controls.country.setValue(this.pack.country)
    this.packForm.controls.price.setValue(this.pack.price)
    this.packForm.controls.days.setValue(this.pack.days)
    this.packForm.controls.nights.setValue(this.pack.nights)
    this.packForm.controls.monthTrip.setValue(this.pack.monthTrip)
    this.packForm.controls.activities.setValue(this.pack.activities)
    this.packForm.controls.imageLink.setValue(this.pack.imageLink)
  }

  disable(){
    this.isDisable = true
  }

}
