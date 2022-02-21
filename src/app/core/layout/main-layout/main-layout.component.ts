import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  @Input() page: string = "";
  @ViewChild('sidenav') sidenav: MatSidenav | any;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.sidenav.close();
  }

}
