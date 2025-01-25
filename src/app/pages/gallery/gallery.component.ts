import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
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
import { EmployeeRespService } from '../../services/employee-resp.service';
import { LoginService } from '../../services/login.service';
import { CoreService } from '../../core/core.service';
import { HttpHeaders } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { ShowImageComponent } from '../show-image/show-image.component';
import { ImageOperationsService } from '../../services/image-operations.service';
import { ImageDataModel } from '../../models/image-data-model';
import { ImageProcessingService } from '../../services/image-processing.service';
import { FileHandle } from '../../models/file-handle';
import { warn } from 'console';
import { AddImageComponent } from '../add-image/add-image.component';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
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
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit{
  imageDataList: ImageDataModel[] = [];
  fileHandleList: FileHandle[] = [];
  private sanitizer = inject(DomSanitizer);
  private _router = inject(Router);
  constructor(
    private _dialog: MatDialog,
    private _imageOpsService: ImageOperationsService,
    private _imageProService: ImageProcessingService,
    private _coreService: CoreService,
    private _loginService: LoginService
  ) {}
  ngOnInit(): void {
    this.showAllImages();
  }

  showAllImages() {
    this._imageOpsService.getAllImageData().subscribe({
      next: res => {
        // console.warn(res);
        this.imageDataList = res;
        this.fileHandleList = this._imageProService.createImages(this.imageDataList);
        // console.warn(this.fileHandleList);
      },
      error: err => {
        console.warn(err);
      }
    });
  }

  // data: any = "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";
  image = this.sanitizer.bypassSecurityTrustUrl(`http://localhost:8082/api/v1/image/trila_icon.png`);

  navigateToShowImage(dataURL: any) {
    const dialogRef = this._dialog.open(ShowImageComponent, {
      data: {
        images: dataURL
      },
      height: '500px',
      width: '800px'
    });
  }

  deleteImage(fileId: number) {
    this._imageOpsService.deleteImage(fileId).subscribe({
      next: deleteImageRes => {
        console.warn(deleteImageRes);
        if(deleteImageRes.deleteResponse === 'Image Deleted Successfully') this._coreService.openSnackBar('Image Deleted Successfully', 'done');
        else this._coreService.openSnackBar('Some Error Occured!!!', 'error');
        this.showAllImages();
      },
      error: err => {
        console.warn(err);
      }
    })
  };

  navigateToAddImage() {
    const dialogRef = this._dialog.open(AddImageComponent);
    dialogRef.afterClosed().subscribe({
      next: res => {
        this.showAllImages();
      }, 
      error: err => {
        console.warn(err);
      }
    })
  };

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
}