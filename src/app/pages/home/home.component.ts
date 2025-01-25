import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { LoginService } from '../../services/login.service';
import { CoreService } from '../../core/core.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private _loginService: LoginService,
    private _coreService: CoreService,
    private _router: Router
  ) {

  }
  onSignOut() {
    var token = sessionStorage.getItem('token');
    var tokLength = token?.length;
    var bearerToken;
    if(tokLength != undefined) bearerToken = token?.substring(1, tokLength-1);
    let header = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    this._loginService.logoutEmployee(header).subscribe({
      next: val => {
        this._coreService.openSnackBar("Logout Successfully!!!", 'done');
      }
    });
    this._router.navigate(['']);
  }

  bugReportClick() {
    this._router.navigate(['gallery']);
  }

  onAdminReportClick() {
    this._router.navigate(['employeeTable']);
  }

  navigateToAllChats() {
    this._router.navigate(['chatHome']);
  }
}
