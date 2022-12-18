import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { AntdModule } from './core/antd/antd.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { StoreModule } from '@ngrx/store';

import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { isLoginGuard } from './core/guards/isLogin.guard';
registerLocaleData(vi);


const routes: Routes = [
  { path: '', loadChildren: () => LoginModule },
  { path: 'home', loadChildren: () => HomeModule, canActivate: [isLoginGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AntdModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoginModule,
    HomeModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    isLoginGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
