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
import { error } from 'console';
import { LoginService } from '../../services/login.service';
import { EmployeeRespService } from '../../services/employee-resp.service';


@Component({
  selector: 'app-edit-user-form',
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
  templateUrl: './edit-user-form.component.html',
  styleUrl: './edit-user-form.component.scss'
})
export class EditUserFormComponent implements OnInit{
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
    private _employeeRespService: EmployeeRespService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<EditUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstname: [''],
      lastname: [''],
      expertise: [''],
      dob: [''],
      company: [''],
      gender: [''],
      experience: [''],
    });
  }
  ngOnInit(): void {
    console.warn(this.data);
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      if(this.data) {
        this.registerData = this.empForm.value;
        
        console.warn(this.registerData);
        console.warn(this.empForm.value);
        console.warn(this.data.id);

        this._employeeRespService.updateEmployee(this.registerData, this.data.id).subscribe({
          next: (res: any) => {
            console.warn(res);
            this._coreService.openSnackBar('Form Updated', 'done');
            this._dialogRef.close();
          },
          error: (err: any) => {
            this._coreService.openSnackBar('Error occured', 'error');
            console.warn(err);
          }
        });
      }
    }
  }
}
