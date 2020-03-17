import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
export const AppRoutes: Routes = [
  {
    path: '', component: BaseLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: LoginComponent },
     // { path: 'tasks', component: TasksComponent },
      { path: 'login', component:  AuthLayoutComponent },
    ]
  }
];
