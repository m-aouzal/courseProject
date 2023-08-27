import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [],
  providers: [],
})
export class LoginModule {}
