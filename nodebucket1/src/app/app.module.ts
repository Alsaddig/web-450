/*

============================================
; Title:  task.ts
; Author: Alsaddig Ibrahim
; Date:   march 19 2020

; Description: part of nodebucket
;===========================================
*/
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LoginComponent } from "./pages/login/login.component";
import { CookieService } from "ngx-cookie-service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AuthGuard } from './shared/guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { MatDividerModule } from "@angular/material/divider";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TaskComponent } from './shared/task/task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBar }from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    NotFoundComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: "enabled"
    }),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule
  ],
  providers: [CookieService, AuthGuard,MatSnackBar ],
  bootstrap: [AppComponent]
})
export class AppModule {}
