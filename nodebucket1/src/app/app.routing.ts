/*

============================================
; Title:  routing.ts
; Author: Alsaddig Ibrahim
; Date:   march 25 2020
; Description: part of nodebucket
;===========================================
*/
import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskComponent } from './shared/task/task.component';

export const AppRoutes: Routes = [
  {
    path: "", component: BaseLayoutComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "login", component: LoginComponent },
      { path: "about", component: AboutComponent },
      {
        path: "task",component: TaskComponent },
      { path: "**", pathMatch: "full",component: NotFoundComponent }
    ]
  }
];
