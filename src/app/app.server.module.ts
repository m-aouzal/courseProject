import { NgModule } from '@angular/core';


import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [
    AppModule,
    ServerModule // ServerModule is used to render the app on the server
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
