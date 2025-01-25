import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FileHandle } from '../../models/file-handle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-image.component.html',
  styleUrl: './show-image.component.scss'
})
export class ShowImageComponent implements OnInit{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    // console.warn(this.data);
  }
}
