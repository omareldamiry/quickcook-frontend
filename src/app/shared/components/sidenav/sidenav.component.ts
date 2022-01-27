import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  @ViewChild('sidenav') sidenav: MatSidenav | any;
  constructor() { }

  ngOnInit(): void {
  }


  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

}
