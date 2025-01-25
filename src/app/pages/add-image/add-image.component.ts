import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ImageOperationsService } from '../../services/image-operations.service';
import { CoreService } from '../../core/core.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-image',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.scss'
})
export class AddImageComponent {
  formData = new FormData();
  file!: File;
  constructor(
    private _imageOpsService: ImageOperationsService,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<AddImageComponent>,
    ) {}

  onSelectFile(event: any) {
    if(event.target.files) {
      
      this.file = event.target.files[0];
      this.formData.append('file', this.file);
      
    } 
  }
  

  onUploadClick(event: any) {
    
    console.warn(this.file);
    if(this.file === undefined) this._coreService.openSnackBar('Error Occured', 'error');
    else {
      this._imageOpsService.uploadImage(this.formData).subscribe({
        next: res => {
          console.warn(res.uploadResponse);
          if(res.uploadResponse === `File uploaded successfully: ${this.file.name}`) this._coreService.openSnackBar('Image Uploaded Succcessfully', 'done');
          else this._coreService.openSnackBar('res.uploadResponse.contains', 'error');
        },
        error: err => {
          console.warn(err);
        }
      });
    }
    this._dialogRef.close();
  }
}
