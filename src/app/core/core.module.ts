import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  exports: [
    MainLayoutComponent,
    AdminLayoutComponent,
  ]
})
export class CoreModule { }
