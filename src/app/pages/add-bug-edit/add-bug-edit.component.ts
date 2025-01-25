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

@Component({
  selector: 'app-add-bug-edit',
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
  templateUrl: './add-bug-edit.component.html',
  styleUrl: './add-bug-edit.component.scss'
})
export class AddBugEditComponent{
  empForm: FormGroup;
  constructor(
    private _fb: FormBuilder
  ) {
    this.empForm = _fb.group({
      bugName: '',
      bugOcc: '',
      bugRes: '',
      bugManager: ''
    })
  }

  priority: string[] = [
    'Low',
    'High',
    'Very High',
    'Severe'
  ];

}
