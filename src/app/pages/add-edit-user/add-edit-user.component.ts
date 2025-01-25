import { Component, Inject, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { CoreService } from '../../core/core.service';
import { EmployeeService } from '../../services/employee.service';
import { RegisterRequest } from '../../models/register-request';
import { LoginService } from '../../services/login.service';
import { EmployeeRespService } from '../../services/employee-resp.service';


@Component({
  selector: 'app-add-edit-user',
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
    HttpClientModule
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})
export class AddEditUserComponent implements OnInit{
  empForm: FormGroup;
  registerData: RegisterRequest = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    experience: '',
    company: '',
    expertise: 0,
    role: ''
  };

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _loginService: LoginService,
    private _employeeService: EmployeeService,
    private _employeeRespService: EmployeeRespService,
    private _dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
      expertise: [''],
      dob: [''],
      company: [''],
      gender: [''],
      experience: [''],
      role:['']
    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    if(sessionStorage.getItem('loggedInUser') !== null) {
      const firstnameLog = JSON.parse(sessionStorage.getItem('loggedInUser')!).given_name;
      const lastnameLog = JSON.parse(sessionStorage.getItem('loggedInUser')!).family_name;
      const usernameLog = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
      console.warn(firstnameLog);
      console.warn(lastnameLog);
      console.warn(usernameLog);
      if(firstnameLog !== undefined) {
        this.empForm.patchValue({firstname: firstnameLog});
      } 
      if(lastnameLog !== undefined) {
        this.empForm.patchValue({lastname: lastnameLog});
      }
      if(usernameLog !== undefined) {
        this.empForm.patchValue({email: usernameLog});
      }
    }
    sessionStorage.removeItem('loggedInUser');
  }

  roles: string[] = [
    'USER',
    'ADMIN',
    'MANAGER'
  ];

  onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this.registerData = this.empForm.value;
        this._employeeRespService.updateEmployee(this.registerData, this.data.id).subscribe({
          next: (res: any) => {
            console.warn(res);
            this._coreService.openSnackBar('Form Submitted', 'done');
            this._dialogRef.close();
          },
          error: (err: any) => {
            this._coreService.openSnackBar('Error occured', 'error');
            console.warn(err);
          }
        });
        
      } else {
        this.registerData = this.empForm.value;
        this._loginService.registerEmployee(this.registerData).subscribe({
          next: res => {
            console.warn(res);
            this._dialogRef.close(true);
          },
          error: err => {
            console.warn(err);
          }
        });
        
      }
    }
    this._userService.getUserList();
  }
}
