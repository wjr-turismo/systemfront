import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pac-card',
  templateUrl: './pac-card.component.html',
  styleUrls: ['./pac-card.component.css']
})
export class PacCardComponent implements OnInit {

  @Input() srcImg!:string
  @Input() city!:string
  @Input() pais!:string
  @Input() price!:string
  @Input() dias!:string
  @Input() noites!:string
  @Input() places!:string
  @Input() atv!:string

  constructor() { }

  ngOnInit(): void {
  }

}
