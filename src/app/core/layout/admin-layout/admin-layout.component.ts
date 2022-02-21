import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  @Input() page: string = "";
  @ViewChild('sidenav') sidenav: MatSidenav | any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(route: string) {
    this.router.navigateByUrl(route);
    this.closeSideNav();
  }

  closeSideNav() {
    this.sidenav.close();
  }

}
