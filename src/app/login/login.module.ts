import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { blockLoginGuard } from '../guards/block-login.guard';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    LoginComponent,
    CommonModule,
    SharedModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forChild([{ path: '', component: LoginComponent,canActivate: [blockLoginGuard] }]),
  ],
  exports: [],
  providers: [],
})
export class LoginModule {}
