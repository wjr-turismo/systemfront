import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  user = {name:localStorage.getItem('user'),role:localStorage.getItem('role')}

  constructor() { }

  ngOnInit(): void {
  }

}
