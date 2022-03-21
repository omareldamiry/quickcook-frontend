import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { AdminAuthData } from 'src/app/core/models/admin-auth-data.model';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.css']
})
export class AdminLoginPage implements OnInit {

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn && this.authService.isAdmin) {
      this.router.navigate(['/admin/home']);
    }
  }

  login(data: AdminAuthData) {
    this.adminService.login(data).subscribe(result => {
      if(result.code == 1) {
        console.log(result.message);
        return;
      } else {
        this.adminService.setAdminFlag(true);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("isAdmin", result.data.isAdmin);
        console.log(result.message);
        this.router.navigateByUrl("/admin/home");
      }
    });
  }

}
