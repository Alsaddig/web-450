/*

============================================
; Title:  login.ts
; Author: Alsaddig Ibrahim
; Date:   march 19 2020
; Description: part of nodebucket
;===========================================
*/


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  form: FormGroup;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.form=this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    });
  }
login(){
  const empId=this.form.controls['empId'].value;
  console.log(empId);
  this.http.get('/api/employees/' + empId).subscribe(res => {
    if(res) {
      this.cookieService.set('session_user', empId);
      this.router.navigate(['/']);

    } else {
      this.snackBar.open('the employee ID you entered is invalid, please try again.', 'ERROR', {
      duration: 3000,
      verticalPosition: 'top'
      });
    }
  });
}
}
