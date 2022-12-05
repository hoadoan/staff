import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTemplateComponent } from './login-template/login-template.component';

const loginRoute: Routes = [
  { path: '', component: LoginTemplateComponent }
]

@NgModule({
  declarations: [
    LoginTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoute),
    FormsModule
  ]
})
export class LoginModule { }
