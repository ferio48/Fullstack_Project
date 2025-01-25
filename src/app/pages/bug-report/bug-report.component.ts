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
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { privateDecrypt } from 'crypto';
import { UserService } from '../../services/user.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { NotAvailablePipe } from "../../pipes/not-available.pipe";
import { NotAvailableNumberPipe } from "../../pipes/not-available-number.pipe";
import { NotAvailableDatePipe } from "../../pipes/not-available-date.pipe";
import { AddBugEditComponent } from '../add-bug-edit/add-bug-edit.component';

@Component({
  selector: 'app-bug-report',
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
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatSnackBarModule,
        RouterOutlet,
        NotAvailablePipe,
        NotAvailableNumberPipe,
        NotAvailableDatePipe
  ],
  templateUrl: './bug-report.component.html',
  styleUrl: './bug-report.component.scss'
})
export class BugReportComponent {
  
  constructor(private dialog: MatDialog) {

  }

  displayedColumns: string[] = [
    'id',
    'bugName',
    'bugDesc',
    'dateOcc',
    'dateRes',
    'bugManager',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddBugClick() {
    const dialogRef = this.dialog.open(AddBugEditComponent);
  }
}
