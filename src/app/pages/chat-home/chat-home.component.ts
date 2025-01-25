import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmployeeRespService } from '../../services/employee-resp.service';
import { EmployeeResponse } from '../../models/employee-response';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat-home',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.scss'
})
export class ChatHomeComponent implements OnInit{
  chatForm: FormGroup;
  searchControl = new FormControl('');
  options: string[] = [];
  empRespList: EmployeeResponse[] = [];
  
  constructor(
    private _fb: FormBuilder,
    private _empRespService: EmployeeRespService
    ) {
      this.chatForm = this._fb.group({
        search: ['']
      })
    }
    
  user$ = this._empRespService.getEmployeeRespList();

  ngOnInit(): void {
    var username = sessionStorage.getItem('username');
    var len = username?.length;
    console.warn(len);
    console.warn(username);
    if(
      username !== undefined 
      && len !== undefined
      && username !== null
      ) 
      username = username.slice(1, len-1);
    console.warn(username);
    
    this._empRespService.getEmployeeRespList().subscribe({
      next: resp => {
        this.empRespList = resp;
        console.warn(this.empRespList);
        // console.warn(this.options);
        this.empRespList.forEach(element => {
          
          if(element.email !== username) this.options.push(element.email);
        });
      },
      error: err => {
        console.warn(err);
      }
    });
  }

  createChat(otherUser: EmployeeResponse) {

  }
}
