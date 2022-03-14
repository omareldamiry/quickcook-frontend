import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { AdminAuthData } from 'src/app/shared/models/admin-auth-data.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.css']
})
export class AdminLoginPage implements OnInit {

  constructor(
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(data: AdminAuthData) {
    this.adminService.login(data).subscribe(result => {
      if(result.code == 1) {
        console.log(result.message);
        return;
      } else {
        this.adminService.setAdminFlag(true);
        localStorage.setItem("token", result.data);
        console.log(result.message);
        this.router.navigateByUrl("/admin/home");
      }
    });
  }

}
