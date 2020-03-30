/*

============================================
; Title:  task.ts
; Author: Alsaddig Ibrahim
; Date:   march 19 2020

; Description: part of nodebucket
;===========================================
*/


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<TaskComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.form=this.fb.group({
      text: [null, Validators.compose([Validators.required])]

    });
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
