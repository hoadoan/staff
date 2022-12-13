import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTemplateComponent } from './login-template/login-template.component';
import { AntdModule } from '../core/antd/antd.module';

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
    FormsModule,
    AntdModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
