declare var google: any;
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserInterface } from '../../models/user-interface';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { CoreService } from '../../core/core.service';
import { EmployeeService } from '../../services/employee.service';
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationRequest } from '../../models/authentication-request';
import { LoginService } from '../../services/login.service';
import { GoogleSSORequest } from '../../models/google-sso-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  private router = inject(Router);
  empForm: FormGroup;
  userService = inject(UserService);
  userObservable = new Observable<any>;
  userList: UserInterface[] = [];
  registerList: RegisterRequest[] = [];
  authRequest: AuthenticationRequest = {
    email: '',
    password: ''
  };
  googleSSORequest: GoogleSSORequest = {
    token: '',
  }
  @Inject(MAT_DIALOG_DATA) public data: any

  constructor (
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _userService: UserService,
    private _employeeService: EmployeeService,
    private _loginService: LoginService
  ) {
    this.empForm = this._fb.group({
      userName: '',
      password: ''
    });
  }
  
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    google.accounts.id.initialize({
      client_id: '102040902154-73e2l9ullpjklpkj9ev6t5ut4ukpdp44.apps.googleusercontent.com',
      callback: (resp: any) => {
        console.warn(resp);
        this.handleLogin(resp);
      } 
    });

    google.accounts.id.renderButton(document.getElementById("google-btn"), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'circle',
      width: 300,
      longtitle: true,
      scope: 'profile email',
    });
  }

  decodeToken(response: string) {
    return JSON.parse(atob(response.split(".")[1]));
  }

  handleLogin(response: any) {
    if(response) {
      console.warn(response);
      const payload = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser',JSON.stringify(payload));
      this.googleSSORequest.token = response.credential.split(".")[1];
      console.warn(this.googleSSORequest);
      this._loginService.googleSSOAuthenticateEmployee(this.googleSSORequest).subscribe({
        next: authData => {
          sessionStorage.setItem("token", JSON.stringify(authData.token));
          this._coreService.openSnackBar("Welcome", 'done');
          this.router.navigate(['home']);
        },
        error: err => {
          console.warn(err);
          const dialogRef = this._dialog.open(AddEditUserComponent);
          dialogRef.afterClosed().subscribe({
            next: (val) => {
              if(val) {
                this._userService.getUserList();
              }
            }, 
            error: (err) => {
            console.warn(err);
            }
          });
          this._coreService.openSnackBar("Email Not found in App DB, please SignUp!!!", 'error');
        }
      })
    } else {
      this._coreService.openSnackBar("SignUp required!!!", 'ok');
    }
  }

  navigateToShowAllUsers() {
    if(this.empForm.valid) 
    {
      if(this.empForm.value.username === '' || this.empForm.value.password === '') {
        this._coreService.openSnackBar('Incomplete Form!!!', 'error');
      } else {
        const usName = this.empForm.value.userName;
        const pass = this.empForm.value.password;
        
        let flag = false;

        this.authRequest.email = usName;
        this.authRequest.password = pass;

        this._loginService.authenticateEmployee(this.authRequest).subscribe({
          next: authData => {
            
            console.warn(authData);
            sessionStorage.setItem('username', JSON.stringify(authData.email));
            sessionStorage.setItem("token", JSON.stringify(authData.token));
            this._coreService.openSnackBar("Welcome", 'done');
            this.router.navigate(['home']);
          },
          error: err => {
            console.warn(err);
            this._coreService.openSnackBar("WRONG CREDENTIALS", 'error');
          }
        });
      }
    } else {
      this._coreService.openSnackBar('Invalid Form', 'error');
    }
  }

  openAddUserForm() {
    const dialogRef = this._dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this._userService.getUserList();
        }
      }, 
      error: (err) => {
        console.warn(err);
      }
    });
  }
}
  