import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { NotAvailablePipe } from "../../pipes/not-available.pipe";
import { NotAvailableNumberPipe } from "../../pipes/not-available-number.pipe";
import { NotAvailableDatePipe } from "../../pipes/not-available-date.pipe";
import { EmployeeRespService } from '../../services/employee-resp.service';
import { LoginService } from '../../services/login.service';
import { CoreService } from '../../core/core.service';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';

@Component({
    selector: 'app-next-page-add-edit-user',
    standalone: true,
    templateUrl: './next-page-add-edit-user.component.html',
    styleUrl: './next-page-add-edit-user.component.scss',
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
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        RouterOutlet,
        NotAvailablePipe,
        NotAvailableNumberPipe,
        NotAvailableDatePipe
    ]
})
export class NextPageAddEditUserComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstname', 
    'lastname', 
    'email', 
    'expertise', 
    'dob', 
    'company', 
    'experience',
    'gender', 
    'role',
    'action'
  ];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
    private _employeeRespService: EmployeeRespService,
    private _loginService: LoginService,
    private _coreService: CoreService,
    private _employeeService: EmployeeService,
    private _router: Router
  ) {

  }
  ngOnInit(): void {
    this.getUserList();
    var token = sessionStorage.getItem('token');
    var tokLength = token?.length;
    var bearerToken;
    if(tokLength != undefined) bearerToken = token?.substring(1, tokLength-1);
    // console.warn(bearerToken);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUserList();
        }
      }, 
      error: (err) => {
        console.warn(err);
      }
    });
  }

  openEditForm(dataComing: any) {
    const dialogRef = this._dialog.open(EditUserFormComponent, {
      data: dataComing,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getUserList();
      }, 
      error: (err) => {
        console.warn(err);
      }
    });
  }

  getUserList() {
    this._employeeRespService.getEmployeeRespList()
    .subscribe({
      next: resp => {
        // console.warn(resp);
        this.dataSource = new MatTableDataSource(resp);
      },
      error: err => {
        console.warn(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: number) {
    var token = sessionStorage.getItem('token');
    var tokLength = token?.length;
    var bearerToken;
    if(tokLength != undefined) bearerToken = token?.substring(1, tokLength-1);

    if(tokLength != undefined) bearerToken = token?.substring(1, tokLength-1);
    let header = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });

    this._employeeService.deleteEmployee(id, header).subscribe({
      next: val => {
        this._coreService.openSnackBar('Employee Deleted Successfully!!!', 'done');
      },
      error: err => {
        this._coreService.openSnackBar('Error Occured!!!', 'error');
        console.warn(err);
      }
    });

    setTimeout(() => this.getUserList(), 2000);
  }

  signOut() {
    var token = sessionStorage.getItem('token');
    var tokLength = token?.length;
    var bearerToken;
    if(tokLength != undefined) bearerToken = token?.substring(1, tokLength-1);
    console.warn(bearerToken);
    let header = new HttpHeaders({ 'Authorization': `Bearer ${bearerToken}` });
    this._loginService.logoutEmployee(header).subscribe({
      next: val => {
        this._coreService.openSnackBar("Logout Successfully!!!", 'done');
      }
    });
    this._router.navigate(['']);
  }

  homeClick() {
    alert("Clicked");
  }

  openProfilePage() {
    this._router.navigate(['profile']);
  }
}
